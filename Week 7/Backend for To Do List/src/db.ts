import camelCase from 'camelize';
import knex, { Knex } from 'knex';
import toSnakeCase from 'to-snake-case';

import { baseKnexConfig } from './knexFile';
import type { NextFunction } from 'express';

const knexConfig: Knex.Config = {
  ...baseKnexConfig,
  connection: {
    ...baseKnexConfig.connection,
    typeCast: (field: any, next: NextFunction) => {
      if (field.type == 'DATE') {
        return field.string();
      }

      return next();
    },
  },
  wrapIdentifier: (
    value: string,
    origImpl: (value: string) => string
  ) => {
    if (value === '*') {
      return origImpl(value);
    }

    return origImpl(toSnakeCase(value));
  },
  postProcessResponse: (result) => {
    return camelCase(result);
  },
};

export default knex(knexConfig);
