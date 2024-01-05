import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config';
import UserModel from '../model/users';
import { ISignUp } from '../interface/auth';
import BadRequestError from '../error/BadRequestError';
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from '../constant';

const SALT_ROUNDS = 10;

export const signup = async (body: ISignUp) => {
  const hashedPassword = await bcrypt.hash(
    body.password,
    SALT_ROUNDS
  );

  const userEmailExists = await UserModel.getByEmail(body.email);

  if (userEmailExists) {
    throw new BadRequestError(
      `User with email: ${body.email} already exists`
    );
  }

  await UserModel.create({
    ...body,
    password: hashedPassword,
  });

  return {
    message: 'User signed up successfully',
  };
};

export const login = async (body: ISignUp) => {
  const user = await UserModel.getByEmail(body.email);

  if (!user) {
    throw new BadRequestError('Invalid Email or Password');
  }

  const passwordMatch = await bcrypt.compare(
    body.password,
    user.password
  );

  if (!passwordMatch) {
    throw new BadRequestError('Invalid Email or Password');
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

const generateAccessToken = (user: any) => {
  const { accessTokenSecret } = config.jwt;
  return jwt.sign(
    { userId: user.id, email: user.email },
    accessTokenSecret,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
};

export const refreshToken = (refreshToken: string) => {
  const { refreshTokenSecret } = config.jwt;
  const decoded = jwt.verify(
    refreshToken,
    refreshTokenSecret
  ) as jwt.JwtPayload;

  // Check if the user exists
  const user = UserModel.getById(decoded.id);
  if (!user) {
    throw new Error('User not found');
  }

  const accessToken = generateAccessToken(user);

  // Respond with the new access token
  return { accessToken };
};
