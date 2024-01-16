import { ILike, Repository } from "typeorm";
import Category from "../models/Category";
import database from "../database/config";
import User from "../models/User";

const repo: Repository<Category> = database.getRepository("categories");
export const createCategory = (category: Category) => {
  const result = repo.save(category);
  return result;
};

export const getAllCategories = async (user: User) => {
  return await repo.find({
    where: { user: { id: user.id } },
  });
};

export const getCategory = async (id: string) => {
  const category = await repo.findOneBy({ id });
  return category;
};

export const updateCategory = async (id: string, category: Category) => {
  return await repo.update({ id }, category);
};

export const deleteCategory = async (id: string) => {
  await repo.delete({ id });
};
export const getUserCategotyCount = async (id: string) => {
  return await repo.findAndCountBy({ user: { id: id } });
};
export const getCategoryTitle = async (user: User, title: string) => {
  const result = await repo.findOne({
    where: { user: { id: user.id }, title: ILike(`%${title}%`) },
  });
  if (!result) return false;  // Return False if result is false
  return result.title ? true : false; // Return true for result.title true else false
};
