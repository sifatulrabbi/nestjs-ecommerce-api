import { Request, Response, NextFunction } from 'express';
import { IShop } from '../types/Shop';

export const validateShopData = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    try {
        const { name, owner, ownerId, desc, categories }: IShop = req.body;
        if (name && owner && ownerId && desc && categories) {
            next();
        } else {
            res.status(404).json({
                message:
                    'required fields: name, owner, owner_id, desc, categories',
            });
        }
    } catch (err) {
        res.status(500).json({
            message: 'internal error',
            error: err,
        });
    }
};
