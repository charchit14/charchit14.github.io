import { Knex } from 'knex';

import db from '../db';

export function getConnectionOrTransaction(
  connection: Knex,
  trx?: Knex.Transaction
): Knex.Transaction | Knex {
  return trx || connection;
}

/**
 * Create a new model.
 */
class BaseModel {
  static connection: Knex = db;

  static getConnection(): Knex {
    return this.connection;
  }

  static queryBuilder(
    trx?: Knex.Transaction
  ): Knex.Transaction | Knex {
    return getConnectionOrTransaction(db, trx);
  }

  static transaction<T>(
    callback: (trx: Knex.Transaction) => Promise<T>
  ): Promise<T> {
    return this.connection.transaction(callback);
  }
}

export default BaseModel;
