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

  async getAProduct(req: Request, res: Response): Promise<void> {
    try {
      const product = await productsModel.findById(req.params.productid);

      if (!product) {
        throw { status: 402, message: 'product not found' };
      }

      res.status(201).json({ message: 'success', data: product });
    } catch (err) {
      res.status(err.status | 500).json({ error: err });
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const newProduct = new productsModel(req.body.product);
      const createdProduct = await newProduct.save();

      res.locals.product = createdProduct;
      res.locals.message = ['added product'];

      next();
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async remove(req: Request, res: Response): Promise<void> {
    try {
    } catch (err) {}
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
    } catch (err) {}
  }
}
