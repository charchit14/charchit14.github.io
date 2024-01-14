import { Repository } from "typeorm";
import database from "../database/config";
import User from "../models/User";
const userRepo: Repository<User> = database.getRepository("users");

export const getAllUsers = async () => {
  return await userRepo.find();
};

export const addUser = async (user: User) => {
  return await userRepo.save(user);
};

export const getUserByEmail = async (email: string) => {
  return await userRepo.findOneBy({ email });
};

export const getUserById = async (id: string) => {
  return await userRepo.findOneBy({ id });
};

export const updateRefreshToken = async (id: string, refreshToken: string) => {
  return await userRepo.update(id, { refreshToken });
};

export const deleteUser = async (user: User) => {
  return await userRepo.delete(user.id);
};
