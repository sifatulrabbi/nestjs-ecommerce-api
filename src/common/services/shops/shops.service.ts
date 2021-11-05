import { Request, Response, NextFunction } from 'express';
import { shopsModel } from '../../models';
import { IShop } from 'src/typings';

export class ShopsService {
  async getShops(req: Request, res: Response): Promise<void> {
    try {
      const shops = await shopsModel.find({});
      res.status(201).json({ message: 'success', data: [...shops] });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async getAShop(req: Request, res: Response): Promise<void> {
    try {
      const shop = await shopsModel.findById(req.params.shopid);
      res.status(201).json({ message: 'success', data: shop });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async createShop(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const user = res.locals.user;
      const shop = req.body.shop;
      const newShop = new shopsModel({
        ...shop,
        owner: user.name,
        ownerId: user._id,
      });
      const createdShop = await newShop.save();
      res.locals.shop = createdShop;
      next();
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async updateShop(req: Request, res: Response): Promise<void> {
    try {
      const shop: IShop = req.body.shop;
      const updatedShop = await shopsModel.findByIdAndUpdate(
        req.params.id,
        { ...shop },
        { new: true },
      );
      res.status(201).json({ message: 'success', data: updatedShop });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async deleteShop(req: Request, res: Response): Promise<void> {
    try {
      await shopsModel.findByIdAndRemove(req.params.id);
      res.status(201).json({ message: 'shop deleted' });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
