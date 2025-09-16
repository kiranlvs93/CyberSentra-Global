import { Router } from 'express';

import {
  sendOtp,
  verifyOtp,
  sendMagicLink,
  verifyMagicLink,
} from '../controllers/fallbackController';
import { requireAuth } from '../middleware/auth';
import { fallbackLimiter } from '../utils/rateLimiter';

const router = Router();

router.post('/otp/send', fallbackLimiter, requireAuth, sendOtp);
router.post('/otp/verify', fallbackLimiter, requireAuth, verifyOtp);
router.post('/magic-link', fallbackLimiter, requireAuth, sendMagicLink);
router.get('/magic-link/verify', fallbackLimiter, requireAuth, verifyMagicLink);

export default router;
