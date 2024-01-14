import { Request, Response, NextFunction } from "express";
import * as userService from "../services/UserService";
import HttpStatus from "http-status-codes";
import User from "../models/User";
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: User[] = await userService.getAllUsers();
    res.status(HttpStatus.ACCEPTED).json({
      message: "User Fetch Success",
      result: data,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User | null = await userService.getUserById(req.params.id);
    res.status(HttpStatus.ACCEPTED).json({
      message: "User Fetch Success",
      result: user,
    });
  } catch (error: any) {
    next(error);
  }
};

export const getUserSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User = res.locals.user;
    const summary = await userService.getUserSummary(user);
    res.status(HttpStatus.OK).json({
      message: "User Summary Fetch Success",
      result: summary,
    });
  } catch (error: any) {
    next(error);
  }
};
