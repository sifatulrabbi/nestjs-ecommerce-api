import { NextFunction, Request, Response } from 'express';
import { IProduct } from 'globals';
import productsModel from '../../models/products/products.model';

export const addToProducts = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const productData: IProduct = req.body.product;
        productData.shopId = req.params.shopid;
        const newProduct = new productsModel(productData);

        const createdProduct = await newProduct.save();

        if (createdProduct) {
            res.locals.product = createdProduct;
            console.log(res.locals.product);
            next();
        } else {
            throw 'unable to create product';
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
};
