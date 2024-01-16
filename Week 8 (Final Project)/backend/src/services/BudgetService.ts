// Import necessary modules and classes
import ForbiddenError from "../errors/Forbidden";
import NotFoundError from "../errors/NotFound";
import UnauthorizedError from "../errors/Unauthorized";
import Budget from "../models/Budget";
import Category from "../models/Category";
import User from "../models/User";
import * as budgetRepo from "../repositories/BudgetRepo";
import * as categoryRepo from "../repositories/CategoryRepo";
import * as userRepo from "../repositories/UserRepo";
import { BudgetQuery } from "../types/QueryType";

// Function to create a new budget
export const createBudget = async (user: User, budget: Budget) => {
  // Check if the user exists
  if (!(await userRepo.getUserById(user.id))) {
    throw new NotFoundError("User not found");
  }

  // Retrieve the category for the budget
  const category = await categoryRepo.getCategory(budget.category as any);
  if (!category) {
    throw new NotFoundError("Category not found");
  }

  // Check if a budget already exists for the given category, start date, and end date
  const budgetsExists: Budget[] = await budgetRepo.getBudgetByCategory(user, category);
  budgetsExists.map((b: Budget) => {
    const existingStartDate = new Date(b.startTime).setHours(0, 0, 0, 0);
    const newStartDate = new Date(budget.startTime).setHours(0, 0, 0, 0);
    const existingEndDate = new Date(b.endTime).setHours(0, 0, 0, 0);
    const newEndDate = new Date(budget.endTime).setHours(0, 0, 0, 0);
    if (existingStartDate == newStartDate && existingEndDate == newEndDate) {
      throw new ForbiddenError("Budget already exists");
    }
  });

  // Set category, user, and remainingAmount for the new budget
  budget.category = category;
  budget.user = user;
  budget.remainingAmount = budget.amount;

  // Create and return the new budget
  const newBudget = await budgetRepo.createBudget(budget);
  return newBudget;
};

// Function to get all budgets for a user
export const getAllBudgets = async (user: User) => {
  // Retrieve budgets for the user
  const budgets = await budgetRepo.getBudget(user);
  return budgets.map((budget) => budgetResponse(budget));
};

// Function to get a budget by ID for a user
export const getBudgetById = async (user: User, id: string) => {
  const budget = await budgetRepo.getBudgetById(user, id);
  if (!budget) {
    throw new NotFoundError("Budget not found");
  }
  return budgetResponse(budget);
};

// Function to update a budget for a user
export const updateBudget = async (user: User, budget: Budget) => {
  // Check if the user exists
  if (!(await userRepo.getUserById(user.id))) {
    throw new NotFoundError("User not found");
  }

  // Retrieve the existing budget
  const foundBudget = await budgetRepo.getBudgetById(user, budget.id);
  if (!foundBudget) {
    throw new NotFoundError("Budget not found");
  }

  // Check if the user is authorized to update the budget
  if (foundBudget.user != (user.id as any)) {
    throw new UnauthorizedError("Unauthorized to update budget");
  }

  // Update the budget
  await budgetRepo.updateBudget(budget);
};

// Function to delete a budget for a user
export const deleteBudget = async (user: User, id: string) => {
  // Check if the user exists
  if (!(await userRepo.getUserById(user.id))) {
    throw new NotFoundError("User not found");
  }

  // Delete the budget
  await budgetRepo.deleteBudget(id);
};

// Function to get filtered budgets for a user based on query parameters
export const getFilteredBudget = (user: User, params: BudgetQuery) => {
  return budgetRepo.getFilteredBudget(user, params);
};

// Helper function to transform a budget for response
const budgetResponse = (budget: Budget) => {
  const responseBudget = new Budget();
  responseBudget.id = budget.id;
  responseBudget.amount = budget.amount;
  responseBudget.startTime = budget.startTime;
  responseBudget.endTime = budget.endTime;
  responseBudget.title = budget.title;
  responseBudget.user = budget.user;
  responseBudget.spentAmount = budget.spentAmount;
  responseBudget.remainingAmount = budget.remainingAmount;
  const category = new Category();
  category.id = budget.category.id;
  category.title = budget.category.title;
  responseBudget.category = category;
  return responseBudget;
};
