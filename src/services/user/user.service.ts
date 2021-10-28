import { Request, Response } from 'express';
import userModel from '../../models/user/user.model';
import * as bcrypt from 'bcrypt';

export class UserService {
  /** @method getAllUsers */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await userModel.find({});
      res.status(201).json({ message: 'success', data: [...users] });
    } catch (err) {
      res.status(500).json({ message: 'unable to find users', error: err });
    }
  }

  /** @method createUser */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, full_name, email, password, shop_id, shop_name } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      const newUser = new userModel({
        name,
        full_name,
        email,
        password: hashedPass,
        shop_id,
        shop_name,
      });

      const user = await newUser.save();
      res.status(201).json({ message: 'User created', data: user });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Unable to create user please try agin', error: err });
    }
  }

  /** @method updateUserInfo */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        password,
        email,
        full_name,
        shop_id,
        shop_name,
        new_password,
      } = req.body;
      const user = await userModel.findOne({ name: req.params.username });
      if (!user) {
        res.status(404).json({ message: 'unable to find user' });
        return;
      }

      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        res.status(404).json({ message: 'unable to verify' });
        return;
      }
      const hashedPass = new_password
        ? await bcrypt.hash(new_password, 10)
        : user.password;
      const updatedUser = await userModel.findByIdAndUpdate(user._id, {
        name,
        email,
        full_name,
        password: hashedPass,
        shop_id,
        shop_name,
      });
      res.status(201).json({ message: 'User updated', data: updatedUser });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Unable to create user please try agin', error: err });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await userModel.findOne({ name: username });
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        res
          .status(404)
          .json({ message: 'username and password did not match' });
        return;
      }
      res.status(201).json({ message: 'success', data: user });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'internal error please try again', error: err });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { username, password } = req.body;
      const user = await userModel.findOne({ name: username });
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        res
          .status(404)
          .json({ message: 'username and password did not match' });
        return;
      }
      await userModel.findByIdAndRemove(user._id);
      res.status(201).json({ message: 'user successfully removed' });
    } catch (err) {
      res
        .status(500)
        .json({ message: 'internal error try again later', error: err });
    }
  }
}
