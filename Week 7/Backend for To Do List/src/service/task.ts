import { IGetAllTasksQuery, ITask } from '../interface/task';
import TaskModel from '../model/task';
import { buildMeta, getPaginationOptions } from '../utils/pagination';

export const getAll = async (query: IGetAllTasksQuery) => {
  const { page, size } = query;

  const pageDetails = getPaginationOptions({ page, size });

  const tasksPromise = TaskModel.getAll({
    ...pageDetails,
    ...query,
  });
  const countPromise = TaskModel.countAll(query);

  const [tasks, count] = await Promise.all([
    tasksPromise,
    countPromise,
  ]);

  const total = count.count;
  const meta = buildMeta(total, size, page);

  return {
    data: tasks,
    meta,
  };
};

export const getById = async (id: number) => {
  const data = await TaskModel.getById(id);

  return data;
};

export const create = async (task: ITask) => {
  const newTask = await TaskModel.create(task);

  return newTask;
};

export const update = async (id: number, body: any) => {
  const task = await TaskModel.getById(id);

  await TaskModel.update(id, body);

  const updatedTask = await TaskModel.getById(id);

  return updatedTask;
};

export const deleteTask = async (id: number) => {
  const task = await TaskModel.getById(id);

  await TaskModel.delete(id);
};
