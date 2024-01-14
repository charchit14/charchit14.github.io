import { NextFunction, Request, Response } from "express";
import * as authService from "../services/AuthService";
import HttpStatus from "http-status-codes";
import User from "../models/User";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User = req.body;
    const response = await authService.login(user);
    res.status(HttpStatus.ACCEPTED).json({
      message: "User Logged in sccessfully",
      tokens: response,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = req.body;
    await authService.register(user);
    res.status(HttpStatus.ACCEPTED).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response) => {};

export const refresh = async (req: Request, res: Response) => {};
