import { Request, Response } from 'express';
import { usersModel } from '../models';
import { IShop } from 'src/typings';

export const addShopToUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const shop: IShop = res.locals.shop;
    await usersModel.findByIdAndUpdate(shop.ownerId, {
      shopName: shop.name,
      shopId: shop._id,
    });
    res.status(201).json({
      message: 'successfully created shop',
      data: shop,
    });
  } catch (err) {
    res.status(500).json({
      message: 'unable to add shop to the user',
      error: err,
    });
  }
};
