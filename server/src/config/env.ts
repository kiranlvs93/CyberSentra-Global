import dotenv from 'dotenv';

dotenv.config();

const toNumber = (value: string | undefined, fallback: number): number => {
  if (!value) {
    return fallback;
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    return fallback;
  }
  return parsed;
};

export const config = {
  port: toNumber(process.env.PORT, 4000),
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/passless',
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  rpId: process.env.RP_ID || 'localhost',
  rpName: process.env.RP_NAME || 'Passless',
  rpOrigin: process.env.RP_ORIGIN || 'http://localhost:5173',
  magicLinkBaseUrl: process.env.MAGIC_LINK_BASE_URL || 'http://localhost:5173/verify',
  mailFrom: process.env.MAIL_FROM || 'passless@example.com',
  smtpHost: process.env.SMTP_HOST,
  smtpPort: toNumber(process.env.SMTP_PORT, 1025),
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  useMockWebauthn: (process.env.USE_MOCK_WEBAUTHN || 'false').toLowerCase() === 'true',
  defaultRiskThreshold: toNumber(process.env.DEFAULT_RISK_THRESHOLD, 65),
  adminEmail: process.env.ADMIN_EMAIL,
  adminDisplayName: process.env.ADMIN_DISPLAY_NAME || 'Administrator',
  otpTtlMinutes: toNumber(process.env.OTP_TTL_MINUTES, 10),
  sessionTtlHours: toNumber(process.env.SESSION_TTL_HOURS, 24),
};

if (!config.jwtSecret) {
  throw new Error('JWT_SECRET must be provided');
}

export const isProduction = process.env.NODE_ENV === 'production';
