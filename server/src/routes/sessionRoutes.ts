import { Router } from 'express';

import { getSession, logout } from '../controllers/sessionController';
import { optionalAuth, requireAuth } from '../middleware/auth';

const router = Router();

router.get('/', optionalAuth, getSession);
router.post('/logout', requireAuth, logout);

export default router;
