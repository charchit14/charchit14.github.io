import { Knex } from 'knex';

const TABLE_NAME = 'users';

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
          fullname: 'User 1',
          email: 'user1@test.com',
          password:
            '$2b$10$W./GL4g9fKuIyLYzH6BsQe7LzvX2l.uEcintM5LyhQN4miHPfHlwa', // test1
        },
        {
          id: 2,
          fullname: 'User 2',
          email: 'user2@test.com',
          password:
            '$2b$10$sPJYyf75p6V/GPfxBhmNL.vqIlY.o65IYk4CWfpXQWnoW8AIffCEe', // test2
        },
      ]);
    });
}
