import { Request, Response } from 'express';
import { IProduct } from 'src/typings';
import { shopsModel } from '../models';

export const addProductToShop = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const product: IProduct = res.locals.product;
    const message = res.locals.message;

    if (!product) {
      res.status(500).json({
        message: 'product not found in add product to shop middleware',
      });
      return;
    }

    const shop = await shopsModel.findById(product.shopId);
    const newProducts = [...shop.products, product._id];

    await shopsModel.findByIdAndUpdate(shop._id, {
      products: [...newProducts],
    });
    message.push('added product id to shop');

    res.status(201).json({ message, product });
  } catch (err) {
    res.status(500).json({
      message: 'internal error in create product middleware',
      error: err,
    });
  }
};
