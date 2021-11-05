import { NextFunction, Request, Response } from 'express';
import { productsModel } from '../../models';

export class ProductsService {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await productsModel.find({});

      if (!products) {
        throw { status: 402, message: 'products not found' };
      }

      res.status(201).json({ data: [...products] });
    } catch (err) {
      res.status(err.status | 500).json({ error: err });
    }
  }

  async getAllFromShop(req: Request, res: Response): Promise<void> {
    try {
      const products = await productsModel.find({
        shopId: req.params.shopid,
      });

      res.status(200).json({ message: 'success', data: products });
    } catch (err) {
      res.status(err.status | 500).json({
        error: err ? err : 'internal error',
      });
    }
  }

  async getAProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await productsModel.findById(req.params.productid);

      if (!product) {
        throw { status: 404, message: 'product not found' };
      }

      res.status(200).json({ message: 'success', data: product });
    } catch (err) {
      res.status(err.status | 500).json({ error: err });
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = req.body.product;
      const shopId = req.params.shopid;

      const newProduct = new productsModel({ ...body, shopId });

      const createdProduct = await newProduct.save();
      res.locals.product = createdProduct;

      next();
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async remove(req: Request, res: Response): Promise<void> {
    try {
      const product = await productsModel.findById(req.params.productid);
      if (!product) throw 'product not found';

      await product.remove();
      res.status(200).json({ message: 'product removed' });
    } catch (err) {
      res.status(404).json({ message: 'internal error' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const body = req.body.product;

      const product = await productsModel.findByIdAndUpdate(
        req.params.productid,
        { ...body },
        { new: true },
      );

      if (!product) throw { status: 404, message: 'product not found' };
      res.status(201).json({ message: 'product updated', data: product });
    } catch (err) {
      res.status(err.status | 500).json({ error: err });
    }
  }
}
