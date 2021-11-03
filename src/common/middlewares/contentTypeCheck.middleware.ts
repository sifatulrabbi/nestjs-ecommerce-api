import { Request, Response, NextFunction } from 'express';

export const contentTypeCheck = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (req.is('application/json') && req.accepts('application/json')) {
    res.status(406).send('Not Acceptable');
  } else {
    next();
  }
};
