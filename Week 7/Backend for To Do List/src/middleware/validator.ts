import { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';

import BadRequestError from '../error/BadRequestError';

export function validateReqBody(schema: Schema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return next(new BadRequestError(error.message));
    }

    req.body = value;

    next();
  };
}
