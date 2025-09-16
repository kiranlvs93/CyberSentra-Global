import { Router } from 'express';

import adminRoutes from './adminRoutes';
import authRoutes from './authRoutes';
import enrollRoutes from './enrollRoutes';
import fallbackRoutes from './fallbackRoutes';
import riskRoutes from './riskRoutes';
import sessionRoutes from './sessionRoutes';

const router = Router();

router.use('/enroll', enrollRoutes);
router.use('/webauthn', authRoutes);
router.use('/risk', riskRoutes);
router.use('/fallback', fallbackRoutes);
router.use('/admin', adminRoutes);
router.use('/session', sessionRoutes);

export default router;
