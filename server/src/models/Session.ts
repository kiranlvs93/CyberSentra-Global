import type { Document, Model } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface ISession extends Document {
  user: Schema.Types.ObjectId;
  sessionToken: string;
  expiresAt: Date;
  needsFallback: boolean;
  fallbackVerifiedAt?: Date;
  userAgent?: string;
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema<ISession>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sessionToken: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    needsFallback: { type: Boolean, default: false },
    fallbackVerifiedAt: { type: Date },
    userAgent: { type: String },
    ipAddress: { type: String },
  },
  { timestamps: true },
);

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Session: Model<ISession> = model<ISession>('Session', sessionSchema);
