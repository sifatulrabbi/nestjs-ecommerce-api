import { Request, Response, NextFunction } from 'express';
import { IUser } from 'src/typings';

export const validateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const user: IUser = req.body.user;
  if (user.name && user.fullName && user.password && user.email) {
    next();
  } else {
    res.status(404).json({
      message: 'required fields: name, email, password, fullName',
      error: 'incorrect credentials',
    });
  }
};
