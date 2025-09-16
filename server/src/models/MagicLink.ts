import type { Document, Model } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface IMagicLink extends Document {
  user: Schema.Types.ObjectId;
  session: Schema.Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
  used: boolean;
  usedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const magicLinkSchema = new Schema<IMagicLink>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    session: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
    tokenHash: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
    usedAt: { type: Date },
  },
  { timestamps: true },
);

magicLinkSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const MagicLink: Model<IMagicLink> = model<IMagicLink>('MagicLink', magicLinkSchema);
