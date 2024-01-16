// Import necessary modules and entities
import { ILike, Repository } from "typeorm";
import Income from "../models/Income";
import database from "../database/config";
import User from "../models/User";

// Get the repository for Income entity from the database connection
const repo: Repository<Income> = database.getRepository("income");

// Get all income records for a specific user
export const getIncome = async (user: User) => {
  return await repo.find({
    where: { user: { id: user.id } },
    relations: { user: true },
  });
};

// Create a new income record
export const createIncome = async (income: Income) => {
  return await repo.save(income);
};

// Update an existing income record
export const updateIncome = async (income: Income) => {
  return await repo.update({ id: income.id }, income);
};

// Delete an income record by its ID
export const deleteIncome = async (id: string) => {
  return await repo.delete({ id });
};

// Get the total amount of income for a specific user
export const getUserTotalIncome = async (id: string) => {
  return await repo.sum("amount", { user: { id: id } });
};

// Get an income record by its ID
export const getIncomeById = async (id: string) => {
  return await repo.findOneBy({ id });
};

// Get the total income for a specific user
export const totalIncome = async (user: User) => {
  return await repo.sum("amount", { user: { id: user.id } });
};

// Get income records with a specific source (e.g., "Salary") for a user
export const getIncomeSource = async (user: User) => {
  return await repo.findOne({
    where: { user: { id: user.id }, source: ILike("Salary") },
  });
};
