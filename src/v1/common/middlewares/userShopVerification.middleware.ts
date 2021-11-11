import { Request, Response, NextFunction } from 'express';
import { usersModel } from '..';

export const userShopVerification = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await usersModel.findOne({ name: req.body.username });

    if (user.shopId === req.params.shopid) {
      next();
    } else {
      res.status(401).json({ message: "user and shop didn't match" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
