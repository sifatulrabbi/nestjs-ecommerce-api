import { Request, Response, NextFunction } from 'express';
import { shopsModel } from '../models';
import { checkUser } from '../utils';

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await checkUser({
      username: req.body.username,
      password: req.body.password,
    });

    res.locals.user = user;

    if (user.shopId) {
      const shop = await shopsModel.findById(user.shopId);
      res.locals.shop = shop;
    }

    next();
  } catch (err) {
    res.status(401).json({ error: err });
  }
};
