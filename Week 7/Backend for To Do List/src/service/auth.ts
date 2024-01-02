import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

import {
  getUsers,
  addUser,
  getUserByEmail,
  getUserById,
} from '../model/users';

import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from '../constant';
import { getRandomString } from '../utils';
import { User } from '../interface/user';

const SALT_ROUNDS = 10;

const generateAccessToken = (user: User) => {
  const { accessTokenSecret } = config.jwt;
  return jwt.sign(
    { userId: user.id, email: user.email },
    accessTokenSecret,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
};

export const signup = async (body: User) => {
  // Check if a user with the provided email already exists
  const existingUserByEmail = getUserByEmail(body.email);
  if (existingUserByEmail) {
    throw new Error('User with this email already exists');
  }

  // Check if a user with the provided ID already exists
  const existingUserById = getUserById(body.id);
  if (existingUserById) {
    throw new Error('User with this ID already exists');
  }

  const hashedPassword = await bcrypt.hash(
    body.password,
    SALT_ROUNDS
  );

  const newUser: User = {
    id: body.id,
    name: body.name,
    email: body.email,
    password: hashedPassword,
  };

  addUser(newUser);
};

export const login = async (body: User) => {
  const user = getUsers().find(({ email }) => email === body.email);

  if (!user) {
    throw new Error('User not found');
  }

  const passwordMatch = await bcrypt.compare(
    body.password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error('Password does not match');
  }

  const accessToken = jwt.sign(user, config.jwt.accessTokenSecret!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });

  const refreshToken = jwt.sign(
    user,
    config.jwt.refreshTokenSecret!,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const refreshToken = (refreshToken: string) => {
  const { refreshTokenSecret } = config.jwt;
  const decoded = jwt.verify(
    refreshToken,
    refreshTokenSecret
  ) as jwt.JwtPayload;

  // Check if the user exists
  const user = getUserById(decoded.id);
  if (!user) {
    throw new Error('User not found');
  }

  const accessToken = generateAccessToken(user);

  // Respond with the new access token
  return { accessToken };
};
