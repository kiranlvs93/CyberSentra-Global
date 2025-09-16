import { RiskEvent } from '../models/RiskEvent';
import type { ISession } from '../models/Session';
import type { IUser } from '../models/User';
import { getTenantSettings } from './tenantSettings';

export interface RiskMetrics {
  typing: {
    average: number;
    variance: number;
  };
  mouse: {
    average: number;
    variance: number;
  };
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

const calculateMetricScore = (average: number, variance: number) => {
  const varianceScore = clamp(variance / 0.05, 0, 1);
  const averageScore = clamp(Math.abs(average - 1) / 1.5, 0, 1);
  return varianceScore * 0.7 + averageScore * 0.3;
};

export const calculateRiskScore = (metrics: RiskMetrics) => {
  const typingScore = calculateMetricScore(metrics.typing.average, metrics.typing.variance);
  const mouseScore = calculateMetricScore(metrics.mouse.average, metrics.mouse.variance);
  const combinedScore = clamp((typingScore + mouseScore) / 2, 0, 1);
  const score = Math.round(combinedScore * 100);
  let riskBucket: 'low' | 'medium' | 'high' = 'low';
  if (score >= 80) {
    riskBucket = 'high';
  } else if (score >= 50) {
    riskBucket = 'medium';
  }
  return { score, riskBucket };
};

export const recordRiskEvent = async (
  user: IUser,
  session: ISession,
  metrics: RiskMetrics,
) => {
  const { score, riskBucket } = calculateRiskScore(metrics);
  const event = await RiskEvent.create({
    user: user._id,
    session: session._id,
    score,
    typingAverage: metrics.typing.average,
    typingVariance: metrics.typing.variance,
    mouseAverage: metrics.mouse.average,
    mouseVariance: metrics.mouse.variance,
    riskBucket,
  });
  return { score, riskBucket, event };
};

export const getRiskThreshold = async () => {
  const settings = await getTenantSettings();
  return settings.riskThreshold;
};
