import NotFoundError from "../errors/NotFound";
import User from "../models/User";
import * as userRepo from "../repositories/UserRepo";
import * as categoryRepo from "../repositories/CategoryRepo";
import * as expenseRepo from "../repositories/ExpenseRepo";
import * as budgetRepo from "../repositories/BudgetRepo";
import * as incomeRepo from "../repositories/IncomeRepo";
import { UserSummary } from "../types/UserSummary";

export const getAllUsers = async (): Promise<User[]> => {
  const users = await userRepo.getAllUsers();
  return users.map((user) => filterUser(user));
};

export const getUserById = async (id: string): Promise<User> => {
  const user = await userRepo.getUserById(id);
  if (!user) throw new NotFoundError(`No any user with id : ${id} found`);
  return filterUser(user);
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const user = await userRepo.getUserByEmail(email);
  if (!user) throw new NotFoundError(`No any user with: ${email} found`);
  return filterUser(user);
};

export const deleteUser = async (id: string) => {
  const user = await userRepo.getUserById(id);
  if (!user) throw new NotFoundError("No such user");
  await userRepo.deleteUser(user);
};

export const updateUser = async (id: string) => {
  const user = await userRepo.getUserById(id);
  if (!user) throw new NotFoundError("No such user");
};
export const getUserSummary = async (user: User) => {
  const foundUser = await userRepo.getUserById(user.id);
  if (!foundUser) throw new NotFoundError("No such user");
  const totalIncome = await incomeRepo.getUserTotalIncome(foundUser.id);
  const totalExpense = await expenseRepo.getUserTotalExpense(foundUser.id);
  const totalBudget = await budgetRepo.getUserTotalBudget(foundUser.id);
  // Returns an array where first element is array of expense and the second element is count
  const expenseCount = await expenseRepo.getUserExpenseCount(foundUser.id);

  const summary: UserSummary = {};
  summary.id = foundUser.id;
  summary.email = foundUser.email;
  summary.username = foundUser.username;
  summary.totalIncome = totalIncome || 0;
  summary.totalExpense = totalExpense || 0;
  summary.totalBudget = totalBudget || 0;
  
  // expenseCount[1] means the count
  summary.countExpense = expenseCount[1]!;

  return summary;
};

const filterUser = (user: User) => {
  const userInfo = new User();
  userInfo.id = user.id;
  userInfo.email = user.email;
  userInfo.username = user.username;
  userInfo.createdAt = user.createdAt;
  userInfo.updatedAt = user.updatedAt;
  return userInfo;
};
