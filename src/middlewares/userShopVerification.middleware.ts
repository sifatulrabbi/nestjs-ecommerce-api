import { Request, Response, NextFunction } from 'express';
import { IShop } from 'globals';
import shopModel from '../models/shop/shop.model';

export const userShopVerification = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const shop: IShop = await shopModel.findById(req.params.shopid);
        if (!shop) {
            res.status(404).json({ error: 'shop not found' });
            return;
        }

        if (shop.ownerId === res.locals.user._id) {
            next();
        } else {
            res.status(404).json({ message: "user and shop didn't match" });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
