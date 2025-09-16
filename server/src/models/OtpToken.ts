import type { Document, Model } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface IOtpToken extends Document {
  user: Schema.Types.ObjectId;
  session: Schema.Types.ObjectId;
  codeHash: string;
  codePreview?: string;
  expiresAt: Date;
  attempts: number;
  maxAttempts: number;
  createdAt: Date;
  updatedAt: Date;
}

const otpTokenSchema = new Schema<IOtpToken>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    session: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
    codeHash: { type: String, required: true },
    codePreview: { type: String },
    expiresAt: { type: Date, required: true },
    attempts: { type: Number, default: 0 },
    maxAttempts: { type: Number, default: 5 },
  },
  { timestamps: true },
);

otpTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OtpToken: Model<IOtpToken> = model<IOtpToken>('OtpToken', otpTokenSchema);
