// Import necessary modules and classes
import ForbiddenError from "../errors/Forbidden";
import NotFoundError from "../errors/NotFound";
import Category from "../models/Category";
import User from "../models/User";
import * as categoryRepo from "../repositories/CategoryRepo";
import * as userRepo from "../repositories/UserRepo";

// Function to create a new category
export const createCategory = async (category: Category) => {
  // Retrieve the user associated with the category
  const user = await userRepo.getUserById(category.user.id);

  // Check if the user exists
  if (!user) throw new NotFoundError("User not found");

  // Check if a category with the same title already exists for the user
  const exists = await categoryRepo.getCategoryTitle(user, category.title);
  if (exists) throw new ForbiddenError("Category already exists");

  // Create and return the new category
  return categoryRepo.createCategory(category);
};

// Function to get all categories for a user
export const getAllCategories = async (user: User) => {
  // Retrieve all categories for the user
  const categories = await categoryRepo.getAllCategories(user);

  // Filter and transform categories for response
  return categories.filter((category) => categoryResponse(category));
};

// Function to get a category by ID
export const getCategory = async (id: string) => {
  // Retrieve the category by ID
  const category = await categoryRepo.getCategory(id);

  // Check if the category exists
  if (!category) throw new NotFoundError("Category not found");

  // Transform and return the category for response
  return categoryResponse(category);
};

// Function to update a category for a user
export const updateCategory = async (user: User, category: Category) => {
  // Check if the category to be updated exists
  const exists = await categoryRepo.getCategory(category.id);
  if (!exists) throw new NotFoundError("Category does not exist");

  // Check if the user is authorized to update the category
  if (user.id != (exists.user as any))
    throw new ForbiddenError("You are not authorized to update this category");

  // Update and return the category
  return categoryRepo.updateCategory(category.id, category);
};

// Function to delete a category for a user
export const deleteCategory = async (user: User, categoryId: string) => {
  // Check if the category to be deleted exists
  const exists = await categoryRepo.getCategory(categoryId);
  if (!exists) throw new NotFoundError("Category does not exist");

  // Check if the user is authorized to delete the category
  if (user.id != (exists.user as any))
    throw new ForbiddenError("You are not authorized to delete this category");

  // Delete the category
  return categoryRepo.deleteCategory(categoryId);
};

// Helper function to transform a category for response
const categoryResponse = (category: Category) => {
  const responseCategory = new Category();
  responseCategory.id = category.id;
  responseCategory.title = category.title;
  responseCategory.description = category.description;
  return responseCategory;
};
