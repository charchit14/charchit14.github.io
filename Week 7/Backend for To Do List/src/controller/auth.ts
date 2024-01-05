import * as authService from '../service/auth';

import HttpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { ISignUp } from '../interface/auth';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: ISignUp = req.body;

    await authService.signup(body);

    return res.status(HttpStatus.CREATED).json({
      message: 'Signed up successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const data = await authService.login(body);

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const refreshToken = (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ error: 'Refresh token is missing' });
  }

  try {
    const accessToken = authService.refreshToken(refreshToken);
    return res.status(200).json({ success: true, accessToken });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'couldnt generate access token',
    });
  }
};
