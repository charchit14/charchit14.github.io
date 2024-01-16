// Import necessary modules and classes
import User from "../models/User";
import * as userRepo from "../repositories/UserRepo";
import fs from "fs";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import config from "../configs";
import {
  JWT_ACCESS_TOKEN_EXPIRY,
  JWT_REFRESH_TOKEN_EXPIRY,
} from "../constants";
import NotFoundError from "../errors/NotFound";
import ForbiddenError from "../errors/Forbidden";
import BadRequestError from "../errors/BadRequest";

// Function to register a new user
export const register = async (user: User) => {
  try {
    const userExists = await userRepo.getUserByEmail(user.email);
    if (userExists) {
      throw new BadRequestError(`User with email ${user.email} already exists`);
    }
    const hashedPassword = await argon2.hash(user.password);
    const newUser = new User();
    newUser.username = user.username;
    newUser.email = user.email;
    newUser.password = hashedPassword;
    const savedUser = await userRepo.addUser(newUser);
    fs.mkdirSync("./uploads/" + savedUser.id, { recursive: true });
  } catch (error) {
    throw error;
  }
};

// Function to handle user login
export const login = async (user: User) => {
  try {
    const foundUser = await userRepo.getUserByEmail(user.email);
    if (!foundUser) {
      throw new NotFoundError(`User with email ${user.email} not found`);
    }
    const isPasswordValid = await argon2.verify(
      foundUser.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ForbiddenError("Invalid password");
    }

    const accessToken = createAccessToken(foundUser.id);
    const refreshToken = createRefreshToken(foundUser.id);

    foundUser!.refreshToken = refreshToken;
    await userRepo.updateRefreshToken(foundUser.id, refreshToken);

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};

// Function to handle user logout
export const logout = async (user: User) => {
  try {
    const userFound = await userRepo.getUserById(user.id);
    await userRepo.updateRefreshToken(userFound!.id, "");
  } catch (error) {
    throw error;
  }
};

// Function to refresh access token using refresh token
export const refresh = async (id: string, refreshToken: string) => {
  try {
    const user = await userRepo.getUserById(id);
    if (!user) throw new NotFoundError("User not found");
    if (user.refreshToken !== refreshToken)
      throw new ForbiddenError("Invalid refresh token");

    const accessToken = createAccessToken(user.id);
    const newRefreshToken = createRefreshToken(user.id);

    user.refreshToken = newRefreshToken;
    await userRepo.updateRefreshToken(user.id, newRefreshToken);

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    throw error;
  }
};

// Function to create a new access token
const createAccessToken = (id: string) => {
  return jwt.sign({ userid: id }, config.jwt.accessSecret, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
  });
};

// Function to create a new refresh token
const createRefreshToken = (id: string) => {
  return jwt.sign({ userid: id }, config.jwt.refreshSecret, {
    expiresIn: JWT_REFRESH_TOKEN_EXPIRY,
  });
};
