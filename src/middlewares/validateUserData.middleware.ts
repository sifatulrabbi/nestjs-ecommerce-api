import { Request, Response, NextFunction } from 'express';
import { IUser } from 'globals';

export const validateUserData = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
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
