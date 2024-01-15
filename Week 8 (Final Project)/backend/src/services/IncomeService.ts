import NotFoundError from "../errors/NotFound";
import ValidationError from "../errors/Validation";
import Income from "../models/Income";
import User from "../models/User";
import * as incomeRepo from "../repositories/IncomeRepo";
import { getUserById } from "../repositories/UserRepo";


// Adding new income source
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
  
  // Checking if user exists
  if (!(await getUserById(user.id))) {
    throw new NotFoundError("User not found");
  }

  // Setting up the user for the income object
  income.user = user;

  // Checking if the income source is "salary"
  if (income.source.toLowerCase() == "salary") {
    
    // Getting the current salary of the user
    const currentSalary = await incomeRepo.getIncomeSource(user);
    const currentDate = new Date();

    // Checking if salary has already been added for the current month
    if (currentSalary) {
      if (
        currentDate.getMonth() == currentSalary.createdAt.getMonth() &&
        currentDate.getFullYear() == currentSalary.createdAt.getFullYear()
      ) {
        throw new ValidationError("This month's salary has already been added");
      }
    }
  }

  // Creating income
  return incomeRepo.createIncome(income);
};


// Getting user's income
/**
 * Retrieves the income of a user.
 *
 * @param {User} user - The user object.
 * @return {Promise<Array<IncomeResponse>>} An array of income responses.
 */
export const getUserIncome = async (user: User) => {
  
  // Checking if the user exists by calling getUserById function
  if (!(await getUserById(user.id))) {
    
    // Throwing an error if user does not exist
    throw new NotFoundError(`User with not found`);
  }

  // Getting the income for the user by calling getIncome function from incomeRepo
  const income = await incomeRepo.getIncome(user);

  // Mapping each income object to its corresponding income response
  return income.map((income) => incomeResponse(income));
};

export const updateIncome = async (user: User, income: Income) => {
  if (!(await getUserById(user.id))) throw new NotFoundError("No such user");
  const existingIncome = await incomeRepo.getIncomeById(income.id);
  if (!existingIncome) throw new NotFoundError("No any income");
  await incomeRepo.updateIncome(income);
};
export const deleteIncome = async (user: User, id: string) => {
  if (!(await getUserById(user.id))) throw new NotFoundError("No such user");
  const income = await incomeRepo.getIncomeById(id);
  if (!income) throw new NotFoundError("No any income");
  await incomeRepo.deleteIncome(income.id);
};


/**
 * Creates a new instance of the Income class and copies some of the properties from the input income object.
 *
 * @param {Income} income - The input income object.
 * @return {Income} The new responseIncome object.
 */
const incomeResponse = (income: Income) => {
  
  // Creating a new instance of Income class
  const responseIncome = new Income();

  // Copying id, source, amount, and active properties from the input income object
  responseIncome.id = income.id;
  responseIncome.source = income.source;
  responseIncome.amount = income.amount;
  responseIncome.date = income.date;

  // Returning the new responseIncome object
  return responseIncome;
};
