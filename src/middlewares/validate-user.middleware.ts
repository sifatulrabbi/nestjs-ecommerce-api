import { Request, Response, NextFunction } from 'express';
import { IUser } from '../types/User';

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password, full_name }: IUser = req.body;
  if (name && email && password && full_name) {
    next();
  } else {
    res.status(404).json({
      message: 'Please provide the required information to proceed',
      error: 'incorrect credentials',
    });
  }
};
