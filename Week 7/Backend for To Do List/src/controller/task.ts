// controllers/taskController.js
import { NextFunction, Request, Response } from 'express';
import * as taskService from '../service/task';
import { IGetAllTasksQuery, ITask } from '../interface/task';

export const getAll = async (req: Request, res: Response) => {
  const query = req.query;

  const data = await taskService.getAll(
    query as unknown as IGetAllTasksQuery
  );

  return res.json(data);
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const data = await taskService.getById(id);

    return res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const body = req.body;
    const data = await taskService.update(id, body);

    return res.json({ data });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: ITask = req.body;

    const task = await taskService.create(body);

    return res.json({ message: 'Task successully created' });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const data = await taskService.deleteTask(id);

    return res.json({ message: 'Task successfully deleted' });
  } catch (error) {
    next(error);
  }
};
