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

// Define an error handler middleware for handling different types of errors
const errorHandler = async (
  err: Error,                 // The error object passed to the middleware
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Log the error stack trace if available
  if (err.stack) {
    logger.error(err.stack);
  }

  // Handle specific types of errors and send appropriate HTTP responses
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
  } else {
    // Default to INTERNAL_SERVER_ERROR for unhandled errors
    res.status(Status.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

// Export the error handler middleware for use in the application
export default errorHandler;
