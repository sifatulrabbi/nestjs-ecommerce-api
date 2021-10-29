import { Request, Response, NextFunction } from 'express';
import { IUser } from '../types/User';

export const validateUserData = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const user: IUser = req.body.user;
    if (user) {
        next();
    } else {
        res.status(404).json({
            message: 'required fields: name, email, password, fullName',
            error: 'incorrect credentials',
        });
    }
};
