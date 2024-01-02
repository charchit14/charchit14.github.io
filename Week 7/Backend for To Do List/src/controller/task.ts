// controllers/taskController.js
import { Request, Response } from 'express';
import * as taskService from '../service/task';

export const getTasks = (req: Request, res: Response) => {
  const result = taskService.getTasks();

  if (result.success) {
    return res.json({
      success: true,
      data: result.data,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: result.error || 'Problem fetching tasks.',
    });
  }
};

export const createTask = (req: Request, res: Response) => {
  const data = req.body;

  const { title, description } = data;

  if (!title) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (title.trim().length === 0) {
    return res.status(400).json({ error: 'Title cannot be empty' });
  }

  if (description && description.trim().length === 0) {
    return res
      .status(400)
      .json({ error: 'Description cannot be empty' });
  }

  const result = taskService.createTask(data);

  if (result.success) {
    return res.json({
      success: true,
      message: 'Task created.',
    });
  } else {
    return res.status(500).json({
      success: false,
      message: result.error || 'Cannot create task',
    });
  }
};

export const editTask = (req: Request, res: Response) => {
  const updatedTaskData = req.body;
  const taskId = req.params.id;

  const { title, description } = updatedTaskData;

  if (!title || !taskId) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (title.trim().length === 0) {
    return res.status(400).json({ error: 'Title cannot be empty' });
  }

  if (description && description.trim().length === 0) {
    return res
      .status(400)
      .json({ error: 'Description cannot be empty' });
  }

  const result = taskService.editTask({
    id: taskId,
    ...updatedTaskData,
  });

  if (result.success) {
    return res.json({
      success: true,
      message: 'Task updated.',
    });
  } else {
    return res.status(500).json({
      success: false,
      message: result.error || 'Cannot update task',
    });
  }
};

export const deleteTask = (req: Request, res: Response) => {
  const taskId = req.params.id;

  const result = taskService.deleteTask(taskId);

  if (!taskId)
    return res.status(401).json({
      success: false,
      message: result.error,
    });

  if (result.success) {
    return res.json({
      success: true,
      message: 'Task deleted.',
    });
  } else {
    return res.status(404).json({
      success: false,
      message: result.error || 'Task not found.',
    });
  }
};
