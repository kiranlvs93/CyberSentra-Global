import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { Credential } from '../models/Credential';
import { RiskEvent } from '../models/RiskEvent';
import { Session } from '../models/Session';
import { User } from '../models/User';
import { createNotFoundError } from '../utils/errors';
import { getTenantSettings, updateTenantSettings } from '../services/tenantSettings';

const updateSettingsSchema = z.object({
  riskThreshold: z.number().min(0).max(100).optional(),
  allowFallback: z.boolean().optional(),
});

export const getMetrics = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [users, credentials, riskEvents, fallbackRequired, fallbackCleared] = await Promise.all([
      User.countDocuments(),
      Credential.countDocuments(),
      RiskEvent.countDocuments(),
      Session.countDocuments({ needsFallback: true }),
      Session.countDocuments({ fallbackVerifiedAt: { $exists: true } }),
    ]);

    const recentEvents = await RiskEvent.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'email displayName');

    const bucketCounts = await RiskEvent.aggregate([
      {
        $group: {
          _id: '$riskBucket',
          count: { $sum: 1 },
        },
      },
    ]);

    const bucketMap: Record<string, number> = {};
    bucketCounts.forEach((entry) => {
      bucketMap[entry._id as string] = entry.count as number;
    });

    return res.json({
      users,
      credentials,
      riskEvents,
      fallbackRequired,
      fallbackCleared,
      recentEvents: recentEvents.map((event) => ({
        id: event._id.toString(),
        score: event.score,
        riskBucket: event.riskBucket,
        createdAt: event.createdAt,
        user: event.user,
      })),
      riskBuckets: bucketMap,
    });
  } catch (error) {
    return next(error);
  }
};

export const listEvents = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await RiskEvent.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .populate('user', 'email displayName');

    return res.json({
      events: events.map((event) => ({
        id: event._id.toString(),
        score: event.score,
        riskBucket: event.riskBucket,
        typingAverage: event.typingAverage,
        typingVariance: event.typingVariance,
        mouseAverage: event.mouseAverage,
        mouseVariance: event.mouseVariance,
        createdAt: event.createdAt,
        user: event.user,
      })),
    });
  } catch (error) {
    return next(error);
  }
};

export const getEventDetail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const event = await RiskEvent.findById(id).populate('user session');
    if (!event) {
      throw createNotFoundError('Event not found');
    }
    return res.json({
      id: event._id.toString(),
      score: event.score,
      riskBucket: event.riskBucket,
      typingAverage: event.typingAverage,
      typingVariance: event.typingVariance,
      mouseAverage: event.mouseAverage,
      mouseVariance: event.mouseVariance,
      createdAt: event.createdAt,
      user: event.user,
      session: event.session,
    });
  } catch (error) {
    return next(error);
  }
};

export const getSettings = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await getTenantSettings();
    return res.json({
      riskThreshold: settings.riskThreshold,
      allowFallback: settings.allowFallback,
      updatedAt: settings.updatedAt,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateSettingsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = updateSettingsSchema.parse(req.body);
    const settings = await updateTenantSettings(payload);
    return res.json({
      riskThreshold: settings.riskThreshold,
      allowFallback: settings.allowFallback,
      updatedAt: settings.updatedAt,
    });
  } catch (error) {
    return next(error);
  }
};
