import { Request, Response, NextFunction } from 'express';
import { shopsModel, usersModel } from '../models';
import * as bcrypt from 'bcrypt';

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await usersModel.findOne({ name: req.body.username });

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      if (user.shopId) res.locals.shop = await shopsModel.findById(user.shopId);
      res.locals.user = user;

      next();
    } else {
      throw 'username or password incorrect';
    }
  } catch (err) {
    res.status(401).json({ message: err });
  }
};
