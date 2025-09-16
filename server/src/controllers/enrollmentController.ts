import type { Request, Response, NextFunction } from 'express';
import { isoBase64URL } from '@simplewebauthn/server/helpers';
import { z } from 'zod';

import { Credential } from '../models/Credential';
import { User } from '../models/User';
import { createBadRequestError, createNotFoundError } from '../utils/errors';
import { createSession, setSessionCookie } from '../services/session';
import { generateRegistration, verifyRegistration } from '../services/webauthn';

const enrollStartSchema = z.object({
  email: z.string().email().optional(),
  displayName: z.string().min(1).max(120).optional(),
});

const enrollFinishSchema = z.object({
  email: z.string().email().optional(),
  credential: z.any(),
  nickname: z.string().max(120).optional(),
});

const serializeUser = (user: InstanceType<typeof User>) => ({
  id: user._id.toString(),
  email: user.email,
  displayName: user.displayName,
  role: user.role,
});

export const startEnrollment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, displayName } = enrollStartSchema.parse(req.body);
    let user = req.user;

    if (!user) {
      if (!email) {
        throw createBadRequestError('Email is required to begin enrollment');
      }
      const normalizedEmail = email.toLowerCase();
      user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        if (!displayName) {
          throw createBadRequestError('Display name is required for new users');
        }
        user = await User.create({
          email: normalizedEmail,
          displayName,
        });
      } else if (displayName && user.displayName !== displayName) {
        user.displayName = displayName;
        await user.save();
      }
    }

    const credentials = await Credential.find({ user: user._id });
    const options = await generateRegistration(user, credentials);

    user.currentChallenge = options.challenge;
    await user.save();

    return res.json({ options });
  } catch (error) {
    return next(error);
  }
};

export const finishEnrollment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, credential, nickname } = enrollFinishSchema.parse(req.body);
    let user = req.user;

    if (!user) {
      if (!email) {
        throw createBadRequestError('Email is required to complete enrollment');
      }
      user = await User.findOne({ email: email.toLowerCase() });
    }

    if (!user) {
      throw createNotFoundError('User not found');
    }

    if (!user.currentChallenge) {
      throw createBadRequestError('No active enrollment challenge');
    }

    const verification = await verifyRegistration(credential, user.currentChallenge);

    if (!verification.verified || !verification.registrationInfo) {
      throw createBadRequestError('Passkey verification failed');
    }

    const existing = await Credential.findOne({
      credentialID: verification.registrationInfo.credentialID,
    });

    if (!existing) {
      await Credential.create({
        user: user._id,
        credentialID: verification.registrationInfo.credentialID,
        credentialPublicKey: verification.registrationInfo.credentialPublicKey,
        counter: verification.registrationInfo.counter,
        credentialBackedUp: verification.registrationInfo.credentialBackedUp,
        credentialDeviceType: verification.registrationInfo.credentialDeviceType,
        transports: credential.transports,
        nickname,
      });
    }

    user.currentChallenge = undefined;
    await user.save();

    const { session, jwtToken } = await createSession(user, {
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
    });

    setSessionCookie(res, jwtToken);

    return res.json({
      user: serializeUser(user),
      session: {
        id: session._id.toString(),
        needsFallback: session.needsFallback,
      },
      credentialId: isoBase64URL.fromBuffer(verification.registrationInfo.credentialID),
    });
  } catch (error) {
    return next(error);
  }
};
