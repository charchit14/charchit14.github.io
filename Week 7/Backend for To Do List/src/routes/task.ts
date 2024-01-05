import { Router } from 'express';

import { validateReqBody } from '../middleware/validator';
import { taskSchema } from '../schema/task';
import {
  createTask,
  deleteTask,
  getAll,
  updateTask,
} from '../controller/task';

const router = Router();

router.get('/', getAll);

router.post('/', validateReqBody(taskSchema), createTask);

router.put('/:id', validateReqBody(taskSchema), updateTask);

router.delete('/:id', deleteTask);

export default router;
