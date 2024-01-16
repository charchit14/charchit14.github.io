import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";

// Middleware for handling 404 Not Found errors
const pathNotFound = (_req: Request, res: Response, next: NextFunction) => {
  // Send a JSON response with a 404 status and a message indicating the requested endpoint was not found
  res.status(HttpStatus.NOT_FOUND).json({
    message: "Requested End Point Not Found",
  });

  // Call the next middleware in the stack
  next();
};

// Export the pathNotFound middleware for use in the application
export default pathNotFound;
