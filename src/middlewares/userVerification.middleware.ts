import { Request, Response, NextFunction } from 'express';
import usersModel from '../models/user/user.model';
import * as bcrypt from 'bcrypt';

export const userVerification = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const user = req.params.userid
            ? await usersModel.findById(req.params.userid)
            : await usersModel.findOne({ name: req.body.username });
        if (!user) {
            res.status(404).json({ error: 'user not found' });
            return;
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            res.locals.user = user;
            next();
        } else {
            res.status(404).json({ message: 'incorrect username or password' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
};
