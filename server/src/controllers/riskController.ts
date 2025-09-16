import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { recordRiskEvent, getRiskThreshold } from '../services/risk';
import { createUnauthorizedError } from '../utils/errors';

const riskSchema = z.object({
  typing: z.object({
    average: z.number().min(0),
    variance: z.number().min(0),
  }),
  mouse: z.object({
    average: z.number().min(0),
    variance: z.number().min(0),
  }),
});

export const submitRisk = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.session) {
      throw createUnauthorizedError('Authentication required');
    }

    const metrics = riskSchema.parse(req.body);
    const { score, riskBucket, event } = await recordRiskEvent(req.user, req.session, metrics);
    const threshold = await getRiskThreshold();

    if (score >= threshold) {
      req.session.needsFallback = true;
      await req.session.save();
    }

    return res.json({
      score,
      riskBucket,
      threshold,
      needsFallback: req.session.needsFallback,
      eventId: event._id.toString(),
    });
  } catch (error) {
    return next(error);
  }
};
