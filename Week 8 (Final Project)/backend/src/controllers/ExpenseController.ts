import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import NotFoundError from "../errors/NotFound";
import Expense from "../models/Expense";
import User from "../models/User";
import * as expenseService from "../services/ExpenseService";

// Get All Expenses Controller
export const getAllExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user information from response locals
    const user: User = res.locals.user;

    // Throw a NotFoundError if user information is not available
    if (!user) throw new NotFoundError("User not found");

    // Call the expense service to retrieve all expenses for the user
    const data = await expenseService.getAllExpenses(user);

    // Send a response with status OK and the fetched expenses
    res.status(HttpStatus.OK).json({
      message: "Expenses were successfully retrieved",
      data,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Create Expense Controller
export const createExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user information from response locals
    const user: User = res.locals.user;

    // Extract expense data from the request body
    const expense: Expense = req.body;

    // If a file is attached to the request, set the image property in the expense
    if ((req as any).file) {
      expense.image = (req as any).file.filename;
    }

    // Call the expense service to create a new expense for the user
    await expenseService.createExpense(user, expense);

    // Send a response with status ACCEPTED
    res.status(HttpStatus.ACCEPTED).json({
      message: "Expense Added successfully",
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Get Filtered Expenses Controller
export const getFilteredExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user information from response locals
    const user: User = res.locals.user;

    // Extract query parameters from the request query
    const params = req.query;

    // Call the expense service to retrieve filtered expenses based on query parameters
    const data = await expenseService.getFilteredExpenses(user, params);

    // Send a response with status OK and the fetched expenses
    res.status(HttpStatus.OK).json({
      message: "Expenses were successfully retrieved",
      result: data,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Update Expense Controller
export const updateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user information from response locals
    const user: User = res.locals.user;

    // Extract expense data from the request body
    const expense: Expense = req.body;

    // Call the expense service to update the specified expense
    await expenseService.updateExpense(user, expense);

    // Send a response with status ACCEPTED
    res.status(HttpStatus.ACCEPTED).json({
      message: "Expense updated successfully",
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Delete Expense Controller
export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user information from response locals
    const user: User = res.locals.user;

    // Extract expense ID from request parameters
    const { id } = req.params;

    // Call the expense service to delete the specified expense by ID
    await expenseService.deleteExpense(user, id);

    // Send a response with status ACCEPTED
    res.status(HttpStatus.ACCEPTED).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};
