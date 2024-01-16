import { FindOptionsWhere, ILike, LessThan, MoreThan, Repository } from "typeorm";
import Budget from "../models/Budget";
import database from "../database/config";
import User from "../models/User";
import Category from "../models/Category";
import { BudgetQuery } from "../types/QueryType";

// Getting the repository for the 'budgets' table
const repo: Repository<Budget> = database.getRepository("budgets");

// Get all budgets for a specific user
export const getBudget = async (user: User) => {
  return await repo.find({
    where: { user: { id: user.id } },
    relations: ["user", "category"],
  });
};

// Get a budget by its ID for a specific user
export const getBudgetById = async (user: User, id: string) => {
  return await repo.findOne({ where: { id, user: { id: user.id } } });
};

// Create a new budget
export const createBudget = async (budget: Budget) => {
  return await repo.save(budget);
};

// Get the total budget amount for a specific user
export const getUserTotalBudget = async (id: string) => {
  return await repo.sum("amount", { user: { id: id } });
};

// Delete a budget by its ID
export const deleteBudget = async (id: string) => {
  return await repo.delete({ id });
};

// Update a budget
export const updateBudget = (budget: Budget) => {
  return repo.update({ id: budget.id }, budget);
};

// Get the total budget amount for a specific user
export const getTotalBudget = async (user: User) => {
  return await repo.sum("amount", {
    user: { id: user.id },
  });
};

// Get the total budget amount for a specific user and category
export const getCategoryTotalBudget = async (
  user: User,
  category: Category
) => {
  return await repo.sum("amount", {
    user: { id: user.id },
    category: { id: category.id },
  });
};

// Get budgets for a specific user and category
export const getBudgetByCategory = async (user: User, category: Category) => {
  return await repo.find({
    where: { user: { id: user.id }, category: { id: category.id } },
  });
};

// Get filtered budgets based on user, title, start/end dates, and category
export const getFilteredBudget = async (user: User, params: BudgetQuery) => {
  const whereConditions: FindOptionsWhere<Budget> = { user: { id: user.id } };
  if (params.id) whereConditions.id = params.id;
  if (params.title) whereConditions.title = ILike(`%${params.title}%`);
  if (params.startDate) whereConditions.startTime = params.startDate;
  if (params.endDate) whereConditions.endTime = params.endDate;
  if (params.category) whereConditions.category = { id: params.category };
  return await repo
    .createQueryBuilder("budget")
    .select([
      "budget.id",
      "budget.amount",
      "budget.startTime",
      "budget.endTime",
      "budget.title",
      "budget.spentAmount",
      "budget.remainingAmount",
    ])
    .where(whereConditions)
    .leftJoinAndSelect("budget.category", "category")
    .getMany();
};

// Get budgets for a specific date, user, and category
export const getCategoryBudgetByDate = async (
  date: Date,
  user: User,
  category: Category
) => {
  return await repo.find({
    where: {
      user: { id: user.id },
      category: { id: category.id },
      startTime: MoreThan(date),
      endTime: LessThan(date),
    },
  });
};
