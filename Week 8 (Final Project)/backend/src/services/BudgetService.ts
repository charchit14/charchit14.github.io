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

export const createBudget = async (user: User, budget: Budget) => {
  if (!(await userRepo.getUserById(user.id))) {
    throw new NotFoundError("User not found");
  }
  const category = await categoryRepo.getCategory(budget.category as any);
  if (!category) {
    throw new NotFoundError("Category not found");
  }
  const budgetsExists: Budget[] = await budgetRepo.getBudgetByCategory(
    user,
    category
  );
  budgetsExists.map((b: Budget) => {
    const existingStartDate = new Date(b.startTime).setHours(0, 0, 0, 0);
    const newStartDate = new Date(budget.startTime).setHours(0, 0, 0, 0);
    const existingEndDate = new Date(b.endTime).setHours(0, 0, 0, 0);
    const newEndDate = new Date(budget.endTime).setHours(0, 0, 0, 0);
    if (existingStartDate == newStartDate && existingEndDate == newEndDate) {
      throw new ForbiddenError("Budget already exists");
    }
  });
  budget.category = category;
  budget.user = user;
  budget.remainingAmount = budget.amount;
  const newBudget = await budgetRepo.createBudget(budget);
  return newBudget;
};

export const getAllBudgets = async (user: User) => {
  const budgets = await budgetRepo.getBudget(user);
  return budgets.map((budget) => budgetResponse(budget));
};
export const getBudgetById = async (user: User, id: string) => {
  const budget = await budgetRepo.getBudgetById(user, id);
  if (!budget) {
    throw new NotFoundError("Budget not found");
  }
  return budgetResponse(budget);
};

export const updateBudget = async (user: User, budget: Budget) => {
  if (!(await userRepo.getUserById(user.id))) {
    throw new NotFoundError("User not found");
  }
  const foundBudget = await budgetRepo.getBudgetById(user, budget.id);
  if (!foundBudget) {
    throw new NotFoundError("Budget not found");
  }
  if (foundBudget.user != (user.id as any)) {
    throw new UnauthorizedError("Unauthorized to update budget");
  }
  await budgetRepo.updateBudget(budget);
};

export const deleteBudget = async (user: User, id: string) => {
  if (!(await userRepo.getUserById(user.id)))
    throw new NotFoundError("User not found");
  await budgetRepo.deleteBudget(id);
};

export const getFilteredBudget = (user: User, params: BudgetQuery) => {
  return budgetRepo.getFilteredBudget(user, params);
};

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
