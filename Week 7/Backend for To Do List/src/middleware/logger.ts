import { Request, Response, NextFunction } from 'express';
import loggerWithNameSpace from '../utils/logger';

const loggerFn = loggerWithNameSpace('Logger');

export const logger = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  loggerFn.info(`${req.method}: ${req.path}`);

  next();
};
