import { Request, Response } from 'express';
import userModel from '../../models/user/user.model';
import { IUser } from '../../types/User';
import * as bcrypt from 'bcrypt';

export class UserService {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const users = await userModel.find({});
            res.status(201).json({ message: 'success', data: [...users] });
        } catch (err) {
            res.status(500).json({ message: 'internal error', error: err });
        }
    }

    async getUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await userModel.findById(req.params.id);
            res.status(201).json({ message: 'success', data: user });
        } catch (err) {
            res.status(500).json({ message: 'internal error', error: err });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const user: IUser = req.body.user;
            const hashedPass = await bcrypt.hash(user.password, 10);

            const newUser = new userModel({ ...user, password: hashedPass });
            const createdUser = await newUser.save();

            res.locals.user = user;
            res.status(201).json({
                message: 'user created',
                data: createdUser,
            });
        } catch (err) {
            res.status(201).json({
                message: 'unable to create user try again later',
                error: err,
            });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const user: IUser = req.body.user;
            if (!user.password === res.locals.user.password) {
                const hashedPass = await bcrypt.hash(user.password, 10);
                user.password = hashedPass;
            }

            const updatedUser = await userModel.findByIdAndUpdate(
                user._id,
                user,
            );
            res.status(201).json({
                message: 'user updated',
                data: updatedUser,
            });
        } catch (err) {}
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const user = res.locals.user;
            res.status(201).json({ message: 'success', data: user });
        } catch (err) {
            res.status(500).json({ message: 'unable to find', error: err });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
        } catch (err) {}
    }
}
