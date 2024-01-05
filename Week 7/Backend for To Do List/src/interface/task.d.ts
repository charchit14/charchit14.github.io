import { IPaginationQuery } from './pagination';

export interface ITask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export interface IGetAllTasksQuery extends IPaginationQuery {}
