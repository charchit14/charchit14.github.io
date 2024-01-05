import { Knex } from 'knex';

const TABLE_NAME = 'tasks';

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements();

    table.string('title').notNullable();
    table.string('description').nullable();
    table.boolean('completed').notNullable().defaultTo(false);

    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('now()'));

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
