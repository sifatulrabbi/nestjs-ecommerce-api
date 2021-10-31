import { Request, Response } from 'express';
import { IProduct } from 'globals';
import shopsModel from '../../models/shops/shops.model';

export const addProductToShop = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const product: IProduct = res.locals.product;

        const shop = await shopsModel.findById(req.params.shopid);
        shop.products.push(product._id);

        await shopsModel.findByIdAndUpdate(req.params.shopid, shop);
        res.status(201).json({
            message: 'product added',
            data: product,
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
