import type { Document, Model } from 'mongoose';
import { Schema, model } from 'mongoose';

type UserRole = 'user' | 'admin';

export interface IUser extends Document {
  email: string;
  displayName: string;
  role: UserRole;
  currentChallenge?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    displayName: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    currentChallenge: { type: String },
  },
  { timestamps: true },
);

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.currentChallenge;
  return obj;
};

export const User: Model<IUser> = model<IUser>('User', userSchema);
