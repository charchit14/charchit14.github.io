// Import necessary modules, classes, and repositories
import NotFoundError from "../errors/NotFound";
import User from "../models/User";
import * as userRepo from "../repositories/UserRepo";
import * as categoryRepo from "../repositories/CategoryRepo";
import * as expenseRepo from "../repositories/ExpenseRepo";
import * as budgetRepo from "../repositories/BudgetRepo";
import * as incomeRepo from "../repositories/IncomeRepo";
import { UserSummary } from "../types/UserSummary";

// Function to get all users
export const getAllUsers = async (): Promise<User[]> => {
  // Retrieve all users from the repository
  const users = await userRepo.getAllUsers();
  // Map and filter user information
  return users.map((user) => filterUser(user));
};

// Function to get a user by ID
export const getUserById = async (id: string): Promise<User> => {
  // Retrieve user by ID from the repository
  const user = await userRepo.getUserById(id);
  // Throw an error if the user is not found
  if (!user) throw new NotFoundError(`No user with ID ${id} found`);
  // Map and filter user information
  return filterUser(user);
};

// Function to get a user by email
export const getUserByEmail = async (email: string): Promise<User> => {
  // Retrieve user by email from the repository
  const user = await userRepo.getUserByEmail(email);
  // Throw an error if the user is not found
  if (!user) throw new NotFoundError(`No user with email ${email} found`);
  // Map and filter user information
  return filterUser(user);
};

// Function to delete a user
export const deleteUser = async (id: string) => {
  // Retrieve user by ID from the repository
  const user = await userRepo.getUserById(id);
  // Throw an error if the user is not found
  if (!user) throw new NotFoundError("No such user");
  // Delete the user from the repository
  await userRepo.deleteUser(user);
};

// Function to update a user
export const updateUser = async (id: string) => {
  // Retrieve user by ID from the repository
  const user = await userRepo.getUserById(id);
  // Throw an error if the user is not found
  if (!user) throw new NotFoundError("No such user");
  // Perform update operations as needed
  // (Note: Implementation is missing in the provided code)
};

// Function to get a summary of user information
export const getUserSummary = async (user: User) => {
  // Retrieve the user by ID from the repository
  const foundUser = await userRepo.getUserById(user.id);
  // Throw an error if the user is not found
  if (!foundUser) throw new NotFoundError("No such user");

  // Retrieve total income, total expense, total budget, and expense count for the user
  const totalIncome = await incomeRepo.getUserTotalIncome(foundUser.id);
  const totalExpense = await expenseRepo.getUserTotalExpense(foundUser.id);
  const totalBudget = await budgetRepo.getUserTotalBudget(foundUser.id);
  const expenseCount = await expenseRepo.getUserExpenseCount(foundUser.id);

  // Create a UserSummary object to hold the summary information
  const summary: UserSummary = {};
  summary.id = foundUser.id;
  summary.email = foundUser.email;
  summary.username = foundUser.username;
  summary.totalIncome = totalIncome || 0;
  summary.totalExpense = totalExpense || 0;
  summary.totalBudget = totalBudget || 0;

  // Set the count of expenses in the summary
  // expenseCount[1] represents the count
  summary.countExpense = expenseCount[1]!;

  // Return the user summary
  return summary;
};

// Helper function to filter user information
const filterUser = (user: User) => {
  const userInfo = new User();
  // Copy relevant user information
  userInfo.id = user.id;
  userInfo.email = user.email;
  userInfo.username = user.username;
  userInfo.createdAt = user.createdAt;
  userInfo.updatedAt = user.updatedAt;
  // Return filtered user information
  return userInfo;
};
