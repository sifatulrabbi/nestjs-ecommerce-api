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

        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            res.status(500).json({ message: 'incorrect username or password' });
            return;
        }

        res.locals.user = user;
        next();
    } catch (err) {
        res.status(500).json({ message: 'internal error', error: err });
    }
};
