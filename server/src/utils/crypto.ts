import crypto from 'crypto';

export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const hashValue = (value: string): string => {
  return crypto.createHash('sha256').update(value).digest('hex');
};

export const generateToken = (size = 32): string => {
  return crypto.randomBytes(size).toString('hex');
};
