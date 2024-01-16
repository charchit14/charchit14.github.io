import { Request, Response, NextFunction } from "express";
import * as userService from "../services/UserService";
import HttpStatus from "http-status-codes";
import User from "../models/User";

// Get All Users Controller
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Call the user service to retrieve all users
    const data: User[] = await userService.getAllUsers();

    // Send a response with status ACCEPTED and the fetched user data
    res.status(HttpStatus.ACCEPTED).json({
      message: "User Fetch Success",
      result: data,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Get User by ID Controller
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Call the user service to retrieve a user by ID
    const user: User | null = await userService.getUserById(req.params.id);

    // Send a response with status ACCEPTED and the fetched user data
    res.status(HttpStatus.ACCEPTED).json({
      message: "User Fetch Success",
      result: user,
    });
  } catch (error: any) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Get User Summary Controller
export const getUserSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user information from response locals
    const user: User = res.locals.user;

    // Call the user service to retrieve the summary for the current user
    const summary = await userService.getUserSummary(user);

    // Send a response with status OK and the fetched user summary
    res.status(HttpStatus.OK).json({
      message: "User Summary Fetch Success",
      result: summary,
    });
  } catch (error: any) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};
