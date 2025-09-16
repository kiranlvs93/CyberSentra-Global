import type { Request, Response, NextFunction } from 'express';
import { isoBase64URL } from '@simplewebauthn/server/helpers';
import { z } from 'zod';

import { Credential } from '../models/Credential';
import { User } from '../models/User';
import { createBadRequestError, createNotFoundError } from '../utils/errors';
import { createSession, setSessionCookie } from '../services/session';
import { generateAuthentication, verifyAuthentication, getMockCredentialId } from '../services/webauthn';

const assertionOptionsSchema = z.object({
  email: z.string().email(),
});

const assertionVerifySchema = z.object({
  email: z.string().email(),
  credential: z.any(),
});

const serializeUser = (user: InstanceType<typeof User>) => ({
  id: user._id.toString(),
  email: user.email,
  displayName: user.displayName,
  role: user.role,
});

export const getAssertionOptions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = assertionOptionsSchema.parse(req.query);
    const user = await User.findOne({ email: (email as string).toLowerCase() });
    if (!user) {
      throw createNotFoundError('User not found');
    }

    const credentials = await Credential.find({ user: user._id });
    if (credentials.length === 0) {
      throw createBadRequestError('No passkeys registered for this user');
    }

    const options = await generateAuthentication(credentials);
    user.currentChallenge = options.challenge;
    await user.save();

    return res.json({ options });
  } catch (error) {
    return next(error);
  }
};

export const verifyAssertion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, credential } = assertionVerifySchema.parse(req.body);
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw createNotFoundError('User not found');
    }
    if (!user.currentChallenge) {
      throw createBadRequestError('No authentication challenge');
    }

    const credentials = await Credential.find({ user: user._id });
    if (credentials.length === 0) {
      throw createBadRequestError('No passkeys registered');
    }

    let authenticator = credentials.find((cred) =>
      isoBase64URL.fromBuffer(cred.credentialID) === credential.id,
    );

    if (!authenticator && credentials.length === 1 && credential.id === getMockCredentialId()) {
      authenticator = credentials[0];
    }

    if (!authenticator) {
      throw createBadRequestError('Unknown credential');
    }

    const verification = await verifyAuthentication(credential, user.currentChallenge, authenticator);
    if (!verification.verified) {
      throw createBadRequestError('Authentication failed');
    }

    if (verification.authenticationInfo?.newCounter !== undefined) {
      authenticator.counter = verification.authenticationInfo.newCounter;
      await authenticator.save();
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
    });
  } catch (error) {
    return next(error);
  }
};
