import type { Document, Model } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface ICredential extends Document {
  user: Schema.Types.ObjectId;
  credentialID: Buffer;
  credentialPublicKey: Buffer;
  counter: number;
  transports?: string[];
  credentialDeviceType?: string;
  credentialBackedUp?: boolean;
  nickname?: string;
  createdAt: Date;
  updatedAt: Date;
}

const credentialSchema = new Schema<ICredential>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    credentialID: { type: Buffer, required: true, unique: true },
    credentialPublicKey: { type: Buffer, required: true },
    counter: { type: Number, default: 0 },
    transports: [{ type: String }],
    credentialDeviceType: { type: String },
    credentialBackedUp: { type: Boolean },
    nickname: { type: String },
  },
  { timestamps: true },
);

export const Credential: Model<ICredential> = model<ICredential>('Credential', credentialSchema);
