import { Request, Response, NextFunction } from 'express';
import userModel from '../models/user/user.model';
import * as bcrypt from 'bcrypt';

export const userAuth = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ name: username });

        if (await bcrypt.compare(password, user.password)) {
            res.locals.user = user;
            next();
        } else {
            res.status(404).json({ message: 'incorrect username or password' });
        }
    } catch (err) {
        res.status(500).json({ message: 'internal error', error: err });
    }
};
