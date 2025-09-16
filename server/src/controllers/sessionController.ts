import type { Request, Response, NextFunction } from 'express';

import { Session } from '../models/Session';
import { clearSessionCookie } from '../services/session';
import { createUnauthorizedError } from '../utils/errors';

const serializeUser = (user: any) =>
  user
    ? {
        id: user._id.toString(),
        email: user.email,
        displayName: user.displayName,
        role: user.role,
      }
    : null;

export const getSession = (req: Request, res: Response) => {
  if (!req.user || !req.session) {
    return res.json({ user: null });
  }
  return res.json({
    user: serializeUser(req.user),
    session: {
      id: req.session._id.toString(),
      needsFallback: req.session.needsFallback,
      fallbackVerifiedAt: req.session.fallbackVerifiedAt,
    },
  });
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session) {
      throw createUnauthorizedError('No active session');
    }

    await Session.findByIdAndDelete(req.session._id);
    clearSessionCookie(res);
    return res.json({ success: true });
  } catch (error) {
    return next(error);
  }
};
