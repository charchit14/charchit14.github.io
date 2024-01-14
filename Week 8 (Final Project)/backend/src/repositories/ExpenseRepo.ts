import { Between, FindOptionsWhere, ILike, Repository } from "typeorm";
import database from "../database/config";
import Category from "../models/Category";
import Expense from "../models/Expense";
import User from "../models/User";
import { ExpenseQuery } from "../types/QueryType";

const repo: Repository<Expense> = database.getRepository("expenses");

export const createExpense = async (expense: Expense) => {
  return await repo.save(expense);
};

export const updateExpense = async (expense: Expense) => {
  return await repo.update({ id: expense.id }, expense);
};

export const deleteExpense = async (id: string) => {
  return await repo.delete({ id });
};

export const getExpenses = async (user: User) => {
  return await repo.find({
    where: { user: { id: user.id } },
  });
};

export const getExpensesById = async (id: string) => {
  return await repo.findOneBy({ id });
};
export const getUserTotalExpense = async (id: string) => {
  return await repo.sum("amount", { user: { id: id } });
};
export const getUserExpenseCount = async (id: string) => {
  return await repo.findAndCountBy({ user: { id } });
};
// Todo Fix the code
//! Date range is not working
export const getTotalExpenseByDate = async (
  startDate: Date,
  endDate: Date,
  user: User,
  category: Category
) => {};

export const getFilteredExpenses = (user: User, params: ExpenseQuery) => {
  const whereConditions: FindOptionsWhere<Expense> = { user: { id: user.id } };
  if (params.id) whereConditions.id = params.id;
  if (params.amount) whereConditions.amount = params.amount;
  if (params.startDate && params.endDate)
    whereConditions.date = Between(params.startDate, params.endDate);
  if (params.description)
    whereConditions.description = ILike(`%${params.description}%`);
  if (params.category) whereConditions.category = { id: params.category };
  return repo.find({ where: whereConditions });
};

export const getExpenseWithCategory = async (
  user: User,
  params: ExpenseQuery
) => {
  const whereConditions: FindOptionsWhere<Expense> = { user: { id: user.id } };
  if (params.id) whereConditions.id = params.id;
  if (params.amount) whereConditions.amount = params.amount;
  if (params.startDate && params.endDate)
    whereConditions.date = Between(params.startDate, params.endDate);
  if (params.description)
    whereConditions.description = ILike(`%${params.description}%`);
  if (params.category) whereConditions.category = { id: params.category };
  return await repo
    .createQueryBuilder("expense")
    .select([
      "expense.id",
      "expense.amount",
      "expense.date",
      "expense.description",
      "expense.image"
    ])
    .where(whereConditions)
    .leftJoinAndSelect("expense.category", "category")
    .getMany();
};

export const getAllExpenseByCategory = (user: User) => {
  return repo
    .createQueryBuilder("expense")
    .select("sum(expense.amount) as categoryTotal")
    .addSelect("category.title as category")
    .groupBy("expense.category_id")
    .addGroupBy("category.title")
    .where({ user: { id: user.id } })
    .leftJoin("expense.category", "category")
    .getRawMany();
};
