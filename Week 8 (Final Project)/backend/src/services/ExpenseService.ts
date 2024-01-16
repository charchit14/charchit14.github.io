// Import necessary modules, classes, and repositories
import NotFoundError from "../errors/NotFound";
import Budget from "../models/Budget";
import Category from "../models/Category";
import Expense from "../models/Expense";
import User from "../models/User";
import * as budgetRepo from "../repositories/BudgetRepo";
import { getCategory } from "../repositories/CategoryRepo";
import * as expenseRepo from "../repositories/ExpenseRepo";
import { getUserById } from "../repositories/UserRepo";
import { ExpenseQuery } from "../types/QueryType";

// Function to create a new expense
export const createExpense = async (user: User, expense: Expense) => {
  // Check if the user exists
  if (!(await getUserById(user.id))) {
    throw new NotFoundError("User not found");
  }

  // Getting category of the expense
  const category = await getCategory(expense.category as any);
  if (!category) {
    throw new NotFoundError("No such category");
  }

  // Update budget based on the new expense
  await updateBudget(user, category, expense, "add");

  // Assign the user to the expense and create it
  expense.user = user;
  await expenseRepo.createExpense(expense);
};

// Function to get all expenses for a user
export const getAllExpenses = async (user: User) => {
  // Check if the user exists
  if (!(await getUserById(user.id))) {
    throw new NotFoundError("No such user");
  }

  // Retrieve all expenses for the user
  const expenses = await expenseRepo.getExpenses(user);

  // Transform and return expenses for response
  return expenses.map((expense) => expenseResponse(expense));
};

// Function to update an expense
export const updateExpense = async (user: User, expense: Expense) => {
  // Check if the user exists
  if (!(await getUserById(user.id))) {
    throw new NotFoundError("No such user");
  }

  // Check if the expense to be updated exists
  const expenseExists = await expenseRepo.getExpensesById(expense.id);
  if (!expenseExists) {
    throw new NotFoundError("No any expense");
  }

  // Get the category of the expense
  const category = await getCategory(expense.category as any);
  if (!category) {
    throw new NotFoundError("No such category");
  }

  // Update budgets based on the changes in the expense
  await updateBudget(user, category, expenseExists, "remove");
  await updateBudget(user, category, expense, "add");

  // Assign the user to the expense and update it
  expense.user = user;
  await expenseRepo.updateExpense(expense);
};

// Function to filter expenses based on query parameters
export const getFilteredExpenses = async (user: User, params: ExpenseQuery) => {
  // Check if the user exists
  if (!(await getUserById(user.id))) {
    throw new NotFoundError("No such user");
  }

  // Get expenses with category information for the user
  const expenses = await expenseRepo.getExpenseWithCategory(user, params);

  // Transform and return expenses for response
  return expenses.map((expense) => expenseResponse(expense));
};

// Function to delete an expense
export const deleteExpense = async (user: User, id: string) => {
  // Check if the user exists
  if (!(await getUserById(user.id))) {
    throw new NotFoundError("No such user");
  }

  // Get the expense to be deleted
  const expense = await expenseRepo.getExpensesById(id);
  if (!expense) {
    throw new NotFoundError("No any expense");
  }

  // Get the category of the expense
  const category = await getCategory(expense.category as any);
  if (!category) {
    throw new NotFoundError("No such category");
  }

  // Update budget based on the deleted expense
  await updateBudget(user, category, expense, "remove");

  // Delete the expense
  await expenseRepo.deleteExpense(expense.id);
};

// Helper function to transform an expense for response
const expenseResponse = (expense: Expense) => {
  const resExpense = new Expense();
  resExpense.id = expense.id;
  resExpense.amount = expense.amount;
  resExpense.date = expense.date;
  resExpense.description = expense.description;
  resExpense.image = `http://localhost:5000/images/${expense.category.user}/${expense.image || "noimage"}`;

  // Transform and assign category information to the expense
  const category = new Category();
  category.id = expense.category.id;
  category.title = expense.category.title;
  resExpense.category = category;

  return resExpense;
};

// Function to update budget based on expense changes
const updateBudget = async (
  user: User,
  category: Category,
  expense: Expense,
  task: "add" | "remove"
) => {
  // Get budgets associated with the user and category
  const budgets: Budget[] = await budgetRepo.getBudgetByCategory(user, category);

  // Check if budgets exist
  if (budgets) {
    if (task === "add") {
      // Update budgets when adding an expense
      await budgets.forEach(async (budget) => {
        const newSpentAmount = budget.spentAmount + expense.amount;
        budget.spentAmount = newSpentAmount;
        budget.remainingAmount = budget.amount - newSpentAmount;

        // Ensure remaining amount does not go below zero
        if (budget.remainingAmount <= 0) {
          budget.remainingAmount = 0;
        }

        // Update the budget
        await budgetRepo.updateBudget(budget);
      });
    } else if (task === "remove") {
      // Update budgets when removing an expense
      await budgets.forEach(async (budget) => {
        const newSpentAmount = budget.spentAmount - expense.amount;
        budget.spentAmount = newSpentAmount;
        budget.remainingAmount = budget.amount - newSpentAmount;

        // Ensure remaining amount does not go above the budget amount
        if (budget.remainingAmount >= budget.amount) {
          budget.remainingAmount = budget.amount;
        }

        // Ensure spent amount does not go below zero
        if (budget.spentAmount <= 0) {
          budget.spentAmount = 0;
        }

        // Update the budget
        await budgetRepo.updateBudget(budget);
      });
    }
  }
};
