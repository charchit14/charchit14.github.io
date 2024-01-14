import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/BadRequest";
import Status from "http-status-codes";
import UnauthorizedError from "../errors/Unauthorized";
import ForbiddenError from "../errors/Forbidden";
import NotFoundError from "../errors/NotFound";
import NotAcceptableError from "../errors/NotAcceptable";

import logger from "../utils/logger";
import ValidationError from "../errors/Validation";
import WarningError from "../errors/Warning";
const errorHandler = async (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.stack) {
    logger.error(err.stack);
  }
  if (err instanceof BadRequestError) {
    res.status(Status.BAD_REQUEST).json({ message: err.message });
  } else if (err instanceof UnauthorizedError) {
    res.status(Status.UNAUTHORIZED).json({ message: err.message });
  } else if (err instanceof ForbiddenError) {
    res.status(Status.FORBIDDEN).json({ message: err.message });
  } else if (err instanceof NotFoundError) {
    res.status(Status.NOT_FOUND).json({ message: err.message });
  } else if (err instanceof NotAcceptableError) {
    res.status(Status.NOT_ACCEPTABLE).json({ message: err.message });
  } else if (err instanceof ValidationError) {
    res.status(Status.BAD_REQUEST).json({ message: err.message });
  } else if (err instanceof WarningError) {
    res.status(Status.IM_A_TEAPOT).json({ message: err.message });
  } else
    res.status(Status.INTERNAL_SERVER_ERROR).json({ message: err.message });
};

export default errorHandler;
