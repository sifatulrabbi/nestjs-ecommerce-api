import { Request, Response, NextFunction } from 'express';
import { checkUser, getUserShop } from '../utils';

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

    const shop = await getUserShop(user.shopId);
    res.locals.user = user;
    res.locals.shop = shop;

    next();
  } catch (err) {
    res.status(401).json({ error: err });
  }
};
