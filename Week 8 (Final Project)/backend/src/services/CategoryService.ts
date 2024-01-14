import ForbiddenError from "../errors/Forbidden";
import NotFoundError from "../errors/NotFound";
import Category from "../models/Category";
import User from "../models/User";
import * as categoryRepo from "../repositories/CategoryRepo";
import * as userRepo from "../repositories/UserRepo";
export const createCategory = async (category: Category) => {
  const user = await userRepo.getUserById(category.user.id);
  if (!user) throw new NotFoundError("User not found");
  const exists = await categoryRepo.getCategoryTitle(user, category.title);
  if (exists) throw new ForbiddenError("Category already exists");
  return categoryRepo.createCategory(category);
};

export const getAllCategories = async (user: User) => {
  const categories = await categoryRepo.getAllCategories(user);
  return categories.filter((category) => categoryResponse(category));
};

export const getCategory = async (id: string) => {
  const category = await categoryRepo.getCategory(id);
  if (!category) throw new NotFoundError("Category not found");
  return categoryResponse(category);
};

export const updateCategory = async (user: User, category: Category) => {
  const exists = await categoryRepo.getCategory(category.id);
  if (!exists) throw new NotFoundError("Category does not exist");
  if (user.id != (exists.user as any))
    throw new ForbiddenError("You are not authorized to update this category");
  return categoryRepo.updateCategory(category.id, category);
};

export const deleteCategory = async (user: User, categoryId: string) => {
  const exists = await categoryRepo.getCategory(categoryId);
  if (!exists) throw new NotFoundError("Category does not exist");
  if (user.id != (exists.user as any))
    throw new ForbiddenError("You are not authorized to delete this category");
  return categoryRepo.deleteCategory(categoryId);
};

const categoryResponse = (category: Category) => {
  const responseCategory = new Category();
  responseCategory.id = category.id;
  responseCategory.title = category.title;
  responseCategory.description = category.description;
  return responseCategory;
};
