import { Router } from 'express';

import taskRoutes from './task';
import authRoutes from './auth';

const router = Router();

router.use('/tasks', taskRoutes);
router.use('/users', authRoutes);

export default router;
