import { Router } from 'express';

import { submitRisk } from '../controllers/riskController';
import { requireAuth } from '../middleware/auth';

const router = Router();

router.post('/score', requireAuth, submitRisk);

export default router;
