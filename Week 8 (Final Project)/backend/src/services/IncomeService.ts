import NotFoundError from "../errors/NotFound";
import ValidationError from "../errors/Validation";
import Income from "../models/Income";
import User from "../models/User";
import * as incomeRepo from "../repositories/IncomeRepo";
import { getUserById } from "../repositories/UserRepo";

//* -------------------------- Add new Income source ------------------------- */
/**
 * Creates a new income for a user.
 *
 * @param user - The user object.
 * @param income - The income object.
 * @returns The created income.
 * @throws NotFoundError if the user is not found.
 * @throws ValidationError if the salary for the current month is already added.
 */
export const createIncome = async (user: User, income: Income) => {
  // Check if the user exists
  if (!(await getUserById(user.id))) {
    throw new NotFoundError("User not found");
  }
  // Set the user for the income object
  income.user = user;
  // Check if the income source is "salary"
  if (income.source.toLowerCase() == "salary") {
    // Get the current salary for the user
    const currentSalary = await incomeRepo.getIncomeSource(user);
    const currentDate = new Date();

    // Check if a salary has already been added for the current month
    if (currentSalary) {
      if (
        currentDate.getMonth() == currentSalary.createdAt.getMonth() &&
        currentDate.getFullYear() == currentSalary.createdAt.getFullYear()
      ) {
        throw new ValidationError("Salary already added for this month");
      }
    }
  }

  // Create the income
  return incomeRepo.createIncome(income);
};

//* -------------------------- Get User Income ------------------------- */
/**
 * Retrieves the income of a user.
 *
 * @param {User} user - The user object.
 * @return {Promise<Array<IncomeResponse>>} An array of income responses.
 */
export const getUserIncome = async (user: User) => {
  // Check if the user exists by calling getUserById function
  if (!(await getUserById(user.id))) {
    // Throw an error if the user does not exist
    throw new NotFoundError(`User with not found`);
  }

  // Get the income for the user by calling getIncome function from incomeRepo
  const income = await incomeRepo.getIncome(user);

  // Map each income object to its corresponding income response
  return income.map((income) => incomeResponse(income));
};

export const updateIncome = async (user: User, income: Income) => {
  if (!(await getUserById(user.id))) throw new NotFoundError("User not found");
  const existingIncome = await incomeRepo.getIncomeById(income.id);
  if (!existingIncome) throw new NotFoundError("Income not found");
  await incomeRepo.updateIncome(income);
};
export const deleteIncome = async (user: User, id: string) => {
  if (!(await getUserById(user.id))) throw new NotFoundError("User not found");
  const income = await incomeRepo.getIncomeById(id);
  if (!income) throw new NotFoundError("Income not found");
  await incomeRepo.deleteIncome(income.id);
};
//* -------------------------- Helper Functions ------------------------- */
/**
 * Creates a new instance of the Income class and copies some of the properties from the input income object.
 *
 * @param {Income} income - The input income object.
 * @return {Income} The new responseIncome object.
 */
const incomeResponse = (income: Income) => {
  // Create a new instance of the Income class
  const responseIncome = new Income();

  // Copy the id, source, amount, and active properties from the input income object
  responseIncome.id = income.id;
  responseIncome.source = income.source;
  responseIncome.amount = income.amount;
  responseIncome.date = income.date;

  // Return the new responseIncome object
  return responseIncome;
};
