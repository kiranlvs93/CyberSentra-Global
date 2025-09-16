import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { sendMagicLinkEmail, sendOtpEmail } from '../services/email';
import { getTenantSettings } from '../services/tenantSettings';
import { generateOtp, generateToken, hashValue } from '../utils/crypto';
import { createBadRequestError, createUnauthorizedError } from '../utils/errors';
import { config } from '../config/env';
import { MagicLink } from '../models/MagicLink';
import { OtpToken } from '../models/OtpToken';

const otpVerifySchema = z.object({
  code: z.string().length(6),
});

const magicLinkVerifySchema = z.object({
  token: z.string().min(10),
});

export const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.session) {
      throw createUnauthorizedError('Authentication required');
    }

    const settings = await getTenantSettings();
    if (!settings.allowFallback) {
      throw createBadRequestError('Fallback verification is disabled');
    }

    await OtpToken.deleteMany({ session: req.session._id });
    const code = generateOtp();
    await OtpToken.create({
      user: req.user._id,
      session: req.session._id,
      codeHash: hashValue(code),
      codePreview: process.env.NODE_ENV !== 'production' ? code : undefined,
      expiresAt: new Date(Date.now() + config.otpTtlMinutes * 60 * 1000),
      attempts: 0,
      maxAttempts: 5,
    });

    await sendOtpEmail(req.user.email, code);

    return res.json({ message: 'OTP sent' });
  } catch (error) {
    return next(error);
  }
};

export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.session) {
      throw createUnauthorizedError('Authentication required');
    }

    const { code } = otpVerifySchema.parse(req.body);

    const token = await OtpToken.findOne({ session: req.session._id }).sort({ createdAt: -1 });
    if (!token) {
      throw createBadRequestError('OTP not found or expired');
    }

    if (token.attempts >= token.maxAttempts) {
      throw createBadRequestError('Too many attempts');
    }

    token.attempts += 1;
    await token.save();

    if (token.codeHash !== hashValue(code)) {
      throw createBadRequestError('Invalid code');
    }

    req.session.needsFallback = false;
    req.session.fallbackVerifiedAt = new Date();
    await req.session.save();

    await OtpToken.deleteMany({ session: req.session._id });

    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};

export const sendMagicLink = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.session) {
      throw createUnauthorizedError('Authentication required');
    }

    const settings = await getTenantSettings();
    if (!settings.allowFallback) {
      throw createBadRequestError('Fallback verification is disabled');
    }

    await MagicLink.deleteMany({ session: req.session._id });

    const token = generateToken(24);
    await MagicLink.create({
      user: req.user._id,
      session: req.session._id,
      tokenHash: hashValue(token),
      expiresAt: new Date(Date.now() + config.otpTtlMinutes * 60 * 1000),
      used: false,
    });

    const link = `${config.magicLinkBaseUrl}?token=${token}`;
    await sendMagicLinkEmail(req.user.email, link);

    return res.json({ message: 'Magic link sent' });
  } catch (error) {
    return next(error);
  }
};

export const verifyMagicLink = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.session) {
      throw createUnauthorizedError('Authentication required');
    }

    const { token } = magicLinkVerifySchema.parse(req.query);
    const hash = hashValue(token);

    const magicLink = await MagicLink.findOne({
      session: req.session._id,
      tokenHash: hash,
    });

    if (!magicLink) {
      throw createBadRequestError('Magic link invalid or expired');
    }

    if (magicLink.used || magicLink.expiresAt.getTime() < Date.now()) {
      throw createBadRequestError('Magic link already used');
    }

    magicLink.used = true;
    magicLink.usedAt = new Date();
    await magicLink.save();

    req.session.needsFallback = false;
    req.session.fallbackVerifiedAt = new Date();
    await req.session.save();

    await MagicLink.deleteMany({ session: req.session._id });

    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};
