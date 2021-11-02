import { Request, Response } from 'express';
import productsModel from '../../models/products/products.model';

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

  async create(req: Request, res: Response): Promise<void> {
    try {
    } catch (err) {}
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
