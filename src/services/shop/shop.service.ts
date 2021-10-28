import shopModel from '../../models/shop/shop.model';
import { Request, Response } from 'express';

export class ShopService {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const shops = await shopModel.find({});
      res.status(201).json({ message: 'success', data: [...shops] });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'internal error please try again later' });
    }
  }
}
