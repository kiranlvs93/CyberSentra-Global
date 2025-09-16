import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../config/env';
import { Session } from '../models/Session';
import { User } from '../models/User';
import { createForbiddenError, createUnauthorizedError } from '../utils/errors';

interface TokenPayload {
  sub: string;
  sid: string;
  token: string;
}

const extractToken = (req: Request): string | undefined => {
  if (req.cookies?.session_token) {
    return req.cookies.session_token as string;
  }
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) {
    return header.split(' ')[1];
  }
  return undefined;
};

const attachSessionFromToken = async (req: Request, token: string) => {
  const payload = jwt.verify(token, config.jwtSecret) as TokenPayload;
  const session = await Session.findById(payload.sid).populate('user');
  if (!session) {
    throw createUnauthorizedError('Session not found');
  }

  if (session.sessionToken !== payload.token) {
    throw createUnauthorizedError('Session revoked');
  }

  if (session.expiresAt.getTime() < Date.now()) {
    throw createUnauthorizedError('Session expired');
  }

  const user = session.user instanceof User ? session.user : await User.findById(session.user);
  if (!user) {
    throw createUnauthorizedError('User not found');
  }

  req.session = session;
  req.user = user;
};

export const requireAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const rawToken = extractToken(req);
  if (!rawToken) {
    return next(createUnauthorizedError('Authentication required'));
  }

  try {
    await attachSessionFromToken(req, rawToken);
    return next();
  } catch (error) {
    return next(error);
  }
};

export const optionalAuth = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const rawToken = extractToken(req);
  if (!rawToken) {
    return next();
  }
  try {
    await attachSessionFromToken(req, rawToken);
  } catch (error) {
    // ignore errors for optional auth
    req.session = undefined;
    req.user = undefined;
  }
  return next();
};

export const requireAdmin = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return next(createUnauthorizedError('Authentication required'));
  }

  if (req.user.role !== 'admin') {
    return next(createForbiddenError('Admin access required'));
  }

  return next();
};
