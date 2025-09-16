import type { Document, Model } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface ITenantSettings extends Document {
  tenantId: string;
  riskThreshold: number;
  allowFallback: boolean;
  updatedAt: Date;
  createdAt: Date;
}

const tenantSettingsSchema = new Schema<ITenantSettings>(
  {
    tenantId: { type: String, required: true, unique: true },
    riskThreshold: { type: Number, default: 65 },
    allowFallback: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const TenantSettings: Model<ITenantSettings> = model<ITenantSettings>(
  'TenantSettings',
  tenantSettingsSchema,
);
