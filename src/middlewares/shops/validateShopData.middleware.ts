import { Request, Response, NextFunction } from 'express';
import { IShop } from 'src/typings';

export const validateShopData = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const shop: IShop = req.body.shop;
  if (shop) {
    next();
  } else {
    res.status(404).json({
      message: 'required fields: name, owner, ownerId, desc, categories',
    });
  }
};
