import { Request, Response } from 'express';
import usersModel from '../../models/user/user.model';
import { IUser } from 'globals';
import * as bcrypt from 'bcrypt';

export class UsersService {
    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const users = await usersModel.find({});
            res.status(201).json({ message: 'success', data: [...users] });
        } catch (err) {
            res.status(500).json({ message: 'internal error', error: err });
        }
    }

    async getUser(req: Request, res: Response): Promise<void> {
        try {
            const name = req.params.username;
            const user = await usersModel
                .findOne({ name }, 'name fullName email')
                .exec();
            res.status(201).json({ message: 'success', data: user });
        } catch (err) {
            res.status(500).json({ message: 'internal error', error: err });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const user: IUser = req.body.user;
            const hashedPass = await bcrypt.hash(user.password, 10);

            const newUser = new usersModel({ ...user, password: hashedPass });
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
            const { user, newPassword } = req.body;
            if (newPassword) {
                user.password = await bcrypt.hash(newPassword, 10);
            }

            const updatedUser = await usersModel.findByIdAndUpdate(
                req.params.id,
                user,
                { new: true },
            );
            if (!updatedUser) throw 'user not found';

            res.status(201).json({
                message: 'user updated',
                data: updatedUser,
            });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        try {
            const user = res.locals.user;
            res.status(201).json({
                message: 'successfully logged in',
                data: user,
            });
        } catch (err) {
            res.status(500).json({ message: 'unable to find', error: err });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            await usersModel.findByIdAndRemove(res.locals.user._id);
            res.status(201).json({ message: 'user deleted' });
        } catch (err) {
            res.status(500).json({
                message: 'internal error please try again later',
            });
        }
    }
}
