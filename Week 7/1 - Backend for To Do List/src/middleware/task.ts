import type { Request, Response, NextFunction } from 'express';

export const taskError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const { title, description } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ error: 'All fields are required' });
    }

    if (title.trim().length === 0) {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }

    if (description && description.trim().length === 0) {
      return res
        .status(400)
        .json({ error: 'Description cannot be empty' });
    }
  }

  next();
};
