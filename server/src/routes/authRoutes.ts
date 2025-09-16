import { Router } from 'express';

import { getAssertionOptions, verifyAssertion } from '../controllers/authenticationController';
import { enrollmentLimiter } from '../utils/rateLimiter';

const router = Router();

router.get('/assertion/options', enrollmentLimiter, getAssertionOptions);
router.post('/assertion/verify', enrollmentLimiter, verifyAssertion);

export default router;
