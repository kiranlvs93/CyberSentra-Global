import type { Document, Model } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface IRiskEvent extends Document {
  user: Schema.Types.ObjectId;
  session: Schema.Types.ObjectId;
  score: number;
  typingAverage: number;
  typingVariance: number;
  mouseAverage: number;
  mouseVariance: number;
  riskBucket: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

const riskEventSchema = new Schema<IRiskEvent>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    session: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
    score: { type: Number, required: true },
    typingAverage: { type: Number, required: true },
    typingVariance: { type: Number, required: true },
    mouseAverage: { type: Number, required: true },
    mouseVariance: { type: Number, required: true },
    riskBucket: { type: String, enum: ['low', 'medium', 'high'], required: true },
  },
  { timestamps: true },
);

riskEventSchema.index({ createdAt: -1 });

export const RiskEvent: Model<IRiskEvent> = model<IRiskEvent>('RiskEvent', riskEventSchema);
