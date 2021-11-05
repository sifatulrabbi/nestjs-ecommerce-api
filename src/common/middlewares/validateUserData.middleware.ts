import { Request, Response, NextFunction } from 'express';

export const validateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const user = req.body.user;
  if (user.name && user.fullName && user.email) {
    next();
  } else {
    res.status(404).json({
      message: 'required fields: name, email, fullName',
      error: 'incorrect credentials',
    });
  }
};
