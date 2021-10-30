import { Request, Response } from 'express';
import shopModel from '../../models/shop/shop.model';
import userModel from '../../models/user/user.model';
import * as bcrypt from 'bcrypt';
import { IShop } from 'globals';

export class ShopService {
    async getShops(req: Request, res: Response): Promise<void> {
        try {
            const shops = await shopModel.find({});
            res.status(201).json({ message: 'success', data: [...shops] });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }

    async getAShop(req: Request, res: Response): Promise<void> {
        try {
            const shop = await shopModel.findById(req.params.id);
            res.status(201).json({ message: 'success', data: shop });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }

    async createShop(req: Request, res: Response): Promise<void> {
        try {
            const user = res.locals.user;
            const shop = req.body.shop;
            const newShop = new shopModel({
                ...shop,
                owner: user.name,
                ownerId: user._id,
            });
            const createdShop = await newShop.save();
            res.status(201).json({ message: 'success', data: createdShop });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }

    async updateShop(req: Request, res: Response): Promise<void> {
        try {
            const shop: IShop = req.body.shop;
            const updatedShop = await shopModel.findByIdAndUpdate(
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
            await shopModel.findByIdAndRemove(req.params.id);
            res.status(201).json({ message: 'shop deleted' });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }

    async addProduct(req: Request, res: Response): Promise<void> {
        try {
            res.status(201).json({ message: 'success' });
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
}
