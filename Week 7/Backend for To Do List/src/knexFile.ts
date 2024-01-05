import { Knex } from 'knex';

import config from './config';

const { database: dbConfig } = config;

export const baseKnexConfig = {
  client: dbConfig.client,
  connection: {
    database: dbConfig.database,
    host: dbConfig.host,
    password: dbConfig.password,
    port: dbConfig.port,
    user: dbConfig.user,
  },
  useNullAsDefault: true,
};

const knexConfig: Knex.Config = {
  ...baseKnexConfig,
  migrations: {
    directory: './database/migrations',
    stub: './stubs/migration.stub',
    tableName: 'migrations',
  },
  seeds: {
    directory: './database/seeds',
    stub: './stubs/seed.stub',
  },
};

export default knexConfig;
