import { NextFunction, Request, Response } from "express";
import * as budgetService from "../services/BudgetService";
import HttpStatus from "http-status-codes";
import Budget from "../models/Budget";
import { BudgetQuery } from "../types/QueryType";
import User from "../models/User";

// Create Budget Controller
export const createBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract budget data from the request body
    const budget = req.body;

    // Extract user information from the response locals
    const user = res.locals.user;

    // Call the budget service to create a new budget
    const response = await budgetService.createBudget(user, budget);

    // Send a response with status ACCEPTED and the created budget
    res.status(HttpStatus.ACCEPTED).json({
      message: "Budget created successfully",
      result: response,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Get All Budgets Controller
export const getAllBudgets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user information from the response locals
    const user = res.locals.user;

    // Call the budget service to retrieve all budgets for the user
    const budgets = await budgetService.getAllBudgets(user);

    // Send a response with status OK and the fetched budgets
    res.status(HttpStatus.OK).json({
      message: "Budgets fetched successfully",
      result: budgets,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Get Budget by ID Controller
export const getBudgetById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user information from the response locals
    const user = res.locals.user;

    // Call the budget service to retrieve a specific budget by ID
    const budget = budgetService.getBudgetById(user, req.params.id);

    // Send a response with status OK and the fetched budget
    res.status(HttpStatus.OK).json({
      message: "Budget fetched successfully",
      result: budget,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Update Budget Controller
export const updateBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract budget data from the request body
    const budget: Budget = req.body;

    // Extract user information from the response locals
    const user = res.locals.user;

    // Call the budget service to update the specified budget
    await budgetService.updateBudget(user, budget);

    // Send a response with status ACCEPTED
    res.status(HttpStatus.ACCEPTED).json({
      message: "Budget updated successfully",
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Delete Budget Controller
export const deleteBudget = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user information from the response locals
    const user = res.locals.user;

    // Call the budget service to delete the specified budget by ID
    await budgetService.deleteBudget(user, req.params.id);

    // Send a response with status ACCEPTED
    res.status(HttpStatus.ACCEPTED).json({
      message: "Budget deleted successfully",
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Get All Filtered Budgets Controller
export const getAllFilteredBudgets = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract user information from the response locals
    const user: User = res.locals.user;

    // Extract query parameters from the request query
    const queries: BudgetQuery = req.query;

    // Call the budget service to retrieve filtered budgets based on query parameters
    const budgets = await budgetService.getFilteredBudget(user, queries);

    // Send a response with status OK and the fetched budgets
    res.status(HttpStatus.OK).json({
      message: "Budgets fetched successfully",
      result: budgets,
    });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};
