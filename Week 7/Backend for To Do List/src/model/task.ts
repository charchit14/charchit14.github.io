import type { ITask } from '../interface/task';

import BaseModel from './BaseModel';

export default class TaskModel extends BaseModel {
  static async getAll(params: any) {
    const query = this.queryBuilder()
      .select({
        id: 'id',
        title: 'title',
        description: 'description',
        completed: 'completed',
      })
      .from('tasks');

    if (params.completed) {
      query.where('completed', true);
    }

    query.offset(params.offset).limit(params.limit);

    return query;
  }

  static countAll(params: any) {
    const query = this.queryBuilder()
      .table('tasks')
      .count({ count: 'id' })
      .first();

    if (params.completed) {
      query.where('completed', true);
    }

    return query;
  }

  static async getById(id: number) {
    return this.queryBuilder()
      .select({
        id: 'id',
        title: 'title',
        description: 'description',
        completed: 'completed',
      })
      .from('tasks')
      .where({ id })
      .first();
  }

  static async create(task: ITask) {
    return this.queryBuilder().insert(task).table('tasks');
  }

  static async update(id: number, task: ITask) {
    return this.queryBuilder()
      .update(task)
      .table('tasks')
      .where({ id });
  }

  static async delete(id: number) {
    return this.queryBuilder().table('tasks').where({ id }).del();
  }
}
