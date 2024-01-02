import { Router } from 'express';

import {
  createTask,
  getTasks,
  editTask,
  deleteTask,
} from '../controller/task';

const router = Router();

router.get('/', getTasks);

router.post('/', createTask);

router.put('/:id', editTask);

router.delete('/:id', deleteTask);

export default router;
