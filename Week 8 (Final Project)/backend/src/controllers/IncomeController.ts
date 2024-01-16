import { NextFunction, Request, Response } from "express";
import * as incomeService from "../services/IncomeService";
import Income from "../models/Income";
import HttpStatus from "http-status-codes";
import User from "../models/User";

// Create Income Controller
export const createIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract income details from the request body
    const incomeDetails: Income = req.body;

    // Extract user information from response locals
    const user: User = res.locals.user;

    // Call the income service to create a new income for the user
    await incomeService.createIncome(user, incomeDetails);

    // Send a response with status ACCEPTED
    res.status(HttpStatus.ACCEPTED).send({
      message: "Income created successfully",
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Get Income Controller
export const getIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user information from response locals
    const user = res.locals.user;

    // Call the income service to retrieve income details for the user
    const data = await incomeService.getUserIncome(user);

    // Send a response with status OK and the fetched income details
    res.status(HttpStatus.OK).json({
      message: "Income returned successfully",
      result: data,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Update Income Controller
export const updateIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user information from response locals
    const user: User = res.locals.user;

    // Extract income details from the request body
    const income: Income = req.body;

    // Call the income service to update the specified income details
    await incomeService.updateIncome(user, income);

    // Send a response with status ACCEPTED
    res.status(HttpStatus.ACCEPTED).json({
      message: "Income updated successfully",
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Delete Income Controller
export const deleteIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user information from response locals
    const user: User = res.locals.user;

    // Extract income ID from request parameters
    const { id } = req.params;

    // Call the income service to delete the specified income by ID
    await incomeService.deleteIncome(user, id);

    // Send a response with status ACCEPTED
    res.status(HttpStatus.ACCEPTED).json({
      message: "Income deleted successfully",
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};
