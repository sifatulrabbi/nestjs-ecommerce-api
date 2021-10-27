import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument } from '../../users/schemas/users.schema';
import { ShopDto } from '../dto/shop.dto';
import { ShopDocument } from '../schemas/shop.schema';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

@Injectable()
export class ShopService {
  constructor(
    @InjectModel('shop') private shopModel: Model<ShopDocument>,
    @InjectModel('users') private usersModel: Model<UsersDocument>,
  ) {}

  private async updateUserShopId(res: Response, shop: IShop): Promise<void> {
    try {
      await this.usersModel.findByIdAndUpdate(shop.user_id, {
        shop_id: shop._id,
        shop_name: shop.name,
      });
    } catch (err) {
      res.status(500).json({ err });
    }
  }

  /** @method getAllShops */
  async getAll(res: Response): Promise<void> {
    try {
      const shops = await this.shopModel.find({});
      res
        .status(201)
        .json({ statusCode: 201, message: 'request successful', data: shops });
    } catch (err) {
      res
        .status(500)
        .json({ statusCode: 500, message: 'Unable to find shops', error: err });
    }
  }

  /** @method createShop */
  async create(res: Response, shopDto: ShopDto): Promise<void> {
    try {
      const newShop = new this.shopModel(shopDto);
      const shop = await newShop.save();
      this.updateUserShopId(res, shop);
      res
        .status(201)
        .json({ statusCode: 201, message: 'request successful', data: shop });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: 'unable to create shop',
        error: 'server error',
      });
    }
  }

  /** @method loginToShop */
  async login(
    res: Response,
    username: string,
    password: string,
  ): Promise<void> {
    const user = await this.usersModel.findOne({ username });
    try {
      const auth = bcrypt.compare(password, user.password);
      if (!auth) {
        res.status(404).json({
          statusCode: 404,
          message: 'username and password did not match!',
        });
      }
      const shop = await this.shopModel.findOne({ _id: user.shop_id });
      if (!shop) {
        res.status(404).json({
          statusCode: 404,
          message: 'Shop not found',
          error: 'invalid input',
        });
      }
      res
        .status(201)
        .json({ statusCode: 201, message: 'Request successful', data: shop });
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: 'unable to process please try again',
        error: err as string,
      });
    }
  }

  /** @method updateShopInfo */
  async update(
    res: Response,
    username: string,
    password: string,
    shopDto: ShopDto,
  ): Promise<void> {
    try {
      const user = await this.usersModel.findOne({ username });
      if (user) {
        const auth = await bcrypt.compare(user.password, password);
        if (!auth) {
          res.status(404).json({
            statusCode: 404,
            message: 'username and password did not match!',
          });
        }
        const updatedShop = await this.shopModel.findByIdAndUpdate(
          user.shop_id,
          shopDto,
        );
        res.status(201).json({
          statusCode: 201,
          message: 'Request successful',
          data: updatedShop,
        });
      }
    } catch (err) {
      res.status(500).json({
        statusCode: 500,
        message: 'unable to process please try again',
        error: err,
      });
    }
  }
}
