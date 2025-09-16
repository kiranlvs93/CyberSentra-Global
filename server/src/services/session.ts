import type { Response } from 'express';
import jwt from 'jsonwebtoken';

import { config, isProduction } from '../config/env';
import { Session } from '../models/Session';
import type { IUser } from '../models/User';
import { generateToken } from '../utils/crypto';

export const createSession = async (
  user: IUser,
  context: { userAgent?: string; ipAddress?: string },
) => {
  const expiresAt = new Date(Date.now() + config.sessionTtlHours * 60 * 60 * 1000);
  const rawToken = generateToken(24);
  const session = await Session.create({
    user: user._id,
    sessionToken: rawToken,
    expiresAt,
    userAgent: context.userAgent,
    ipAddress: context.ipAddress,
  });

  const jwtToken = jwt.sign(
    {
      sub: user._id.toString(),
      sid: session._id.toString(),
      token: rawToken,
    },
    config.jwtSecret,
    { expiresIn: `${config.sessionTtlHours}h` },
  );

  return { session, jwtToken };
};

export const setSessionCookie = (res: Response, token: string) => {
  res.cookie('session_token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: config.sessionTtlHours * 60 * 60 * 1000,
  });
};

export const clearSessionCookie = (res: Response) => {
  res.clearCookie('session_token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
  });
};
