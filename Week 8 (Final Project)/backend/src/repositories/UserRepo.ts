// Import necessary modules and entities
import { Repository } from "typeorm";
import database from "../database/config";
import User from "../models/User";

// Get the repository for User entity from the database connection
const userRepo: Repository<User> = database.getRepository("users");

// Get all users from the database
export const getAllUsers = async () => {
  return await userRepo.find();
};

// Add a new user to the database
export const addUser = async (user: User) => {
  return await userRepo.save(user);
};

// Get a user by their email address
export const getUserByEmail = async (email: string) => {
  return await userRepo.findOneBy({ email });
};

// Get a user by their ID
export const getUserById = async (id: string) => {
  return await userRepo.findOneBy({ id });
};

// Update the refresh token for a user
export const updateRefreshToken = async (id: string, refreshToken: string) => {
  return await userRepo.update(id, { refreshToken });
};

// Delete a user from the database
export const deleteUser = async (user: User) => {
  return await userRepo.delete(user.id);
};
