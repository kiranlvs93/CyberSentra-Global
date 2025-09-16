import { Router } from 'express';

import { startEnrollment, finishEnrollment } from '../controllers/enrollmentController';
import { optionalAuth } from '../middleware/auth';
import { enrollmentLimiter } from '../utils/rateLimiter';

const router = Router();

router.post('/start', enrollmentLimiter, optionalAuth, startEnrollment);
router.post('/finish', enrollmentLimiter, optionalAuth, finishEnrollment);

export default router;
