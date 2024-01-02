import { Router } from 'express';

import taskRoutes from './task';
import authRoutes from './auth';

import { taskError } from '../middleware/task';

const router = Router();

router.use('/tasks', taskError, taskRoutes);
router.use('/users', authRoutes);

export default router;
