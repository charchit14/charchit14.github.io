import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";

const pathNotFound = (_req: Request, res: Response,next : NextFunction) => {
  res.status(HttpStatus.NOT_FOUND).json({
    message: "Requested End Point Not Found",
  });
  next();
};

export default pathNotFound;