import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log(`[${req.method}] [${req.url}] [${res.statusCode}]`);

  next();
};
