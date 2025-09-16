import { Router } from 'express';

import {
  getMetrics,
  listEvents,
  getEventDetail,
  updateSettingsHandler,
  getSettings,
} from '../controllers/adminController';
import { requireAdmin, requireAuth } from '../middleware/auth';

const router = Router();

router.use(requireAuth, requireAdmin);

router.get('/metrics', getMetrics);
router.get('/events', listEvents);
router.get('/events/:id', getEventDetail);
router.get('/settings', getSettings);
router.post('/settings', updateSettingsHandler);

export default router;
