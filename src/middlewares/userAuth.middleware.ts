import { Request, Response, NextFunction } from 'express';
import usersModel from '../models/user/user.model';
import * as bcrypt from 'bcrypt';

export const userAuth = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const username: string = req.body.username;
        const password: string = req.body.password;

        const user = await usersModel.findOne({ name: username });
        if (!user) {
            res.status(404).json({ error: 'user not found' });
            return;
        }

        if (await bcrypt.compare(password, user.password)) {
            res.locals.user = user;
            next();
        } else {
            res.status(404).json({ message: 'incorrect username or password' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
