import { Request, Response } from 'express';
import { IProduct } from 'src/typings';
import { shopsModel } from '../models';

export const addProductToShop = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const product: IProduct = res.locals.product;
    if (!product) {
      res.status(404).json({ error: 'product not found' });
    }

    const shop = await shopsModel.findById(product.shopId);
    const newProducts = [...shop.products, product._id];

    await shopsModel.findByIdAndUpdate(shop._id, {
      products: [...newProducts],
    });

    res.status(201).json({ message: 'product created', product });
  } catch (err) {
    res.status(500).json({
      message: 'internal error in addProductToShop',
      error: err,
    });
  }
};
