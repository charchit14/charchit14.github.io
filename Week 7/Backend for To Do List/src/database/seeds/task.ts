import { Knex } from 'knex';

const TABLE_NAME = 'tasks';

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          id: 1,
          title: 'Task title 1',
          description: 'Task description 1',
          completed: false,
        },
        {
          id: 2,
          title: 'Task title 2',
          description: 'Task description 2',
          completed: false,
        },
        {
          id: 3,
          title: 'Task title 3',
          description: 'Task description 3',
          completed: true,
        },
        {
          id: 4,
          title: 'Task title 4',
          description: 'Task description 4',
          completed: true,
        },
        {
          id: 5,
          title: 'Task title 5',
          description: 'Task description 5',
          completed: false,
        },
      ]);
    });
}
