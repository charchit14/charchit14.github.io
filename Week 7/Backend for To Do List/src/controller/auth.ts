import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import * as authService from '../service/auth';

export const signup = async (req: Request, res: Response) => {
  const { body } = req;

  if (!body.email || !body.password || !body.id) {
    return res.status(401).json({
      success: false,
      message: 'All fields are required!',
    });
  }
  try {
    await authService.signup(body);
    return res.json({
      message: 'Signed up successfully',
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error?.toString(),
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { body } = req;

  if (!body.email || !body.password) {
    return res.status(401).json({
      success: false,
      message: 'All fields are required!',
    });
  }

  try {
    const data = await authService.login(body);

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error?.toString(),
    });
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
    return res
      .status(401)
      .json({
        success: false,
        message: 'couldnt generate access token',
      });
  }
};
