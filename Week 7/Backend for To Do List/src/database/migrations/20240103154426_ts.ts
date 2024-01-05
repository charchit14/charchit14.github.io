import { Knex } from 'knex';

const TABLE_NAME = 'users';

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table.string('fullname', 255).notNullable();

    table.string('email', 255).notNullable().unique();

    table.string('password', 255).notNullable().unique();

    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now());

    table.timestamp('updated_at').nullable();
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
