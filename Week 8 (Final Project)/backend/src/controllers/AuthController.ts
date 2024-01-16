import { NextFunction, Request, Response } from "express";
import * as authService from "../services/AuthService";
import HttpStatus from "http-status-codes";
import User from "../models/User";

// Login Controller
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user information from the request body
    const user: User = req.body;

    // Call the login service to authenticate the user and generate tokens
    const response = await authService.login(user);

    // Send a response with status ACCEPTED and the generated tokens
    res.status(HttpStatus.ACCEPTED).json({
      message: "User Logged in successfully",
      tokens: response,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Register Controller
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user information from the request body
    const user: any = req.body;

    // Call the register service to create a new user
    await authService.register(user);

    // Send a response with status ACCEPTED and a success message
    res.status(HttpStatus.ACCEPTED).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Logout Controller
export const logout = async (req: Request, res: Response) => {
  // This function is currently empty
};

// Refresh Token Controller
export const refresh = async (req: Request, res: Response) => {
  // This function is currently empty
};
