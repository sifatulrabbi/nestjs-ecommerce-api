import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ShopsDocument } from './entities';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { UsersDocument } from '../users';
import { IShop } from 'src/interfaces';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel('shops')
    private readonly shopsModel: Model<ShopsDocument>,
  ) {}

  async create(
    user: UsersDocument,
    createShopDto: CreateShopDto,
  ): Promise<ShopsDocument> {
    const newShop = new this.shopsModel({
      ...createShopDto,
      owner_name: user.name,
      owner_id: user._id,
    });

    const createdShop = await newShop.save();
    return createdShop;
  }

  async findAll(): Promise<ShopsDocument[]> {
    const shops: ShopsDocument[] = await this.shopsModel.find({});
    return shops;
  }

  async findOne(id: string): Promise<IShop> {
    const shop: IShop = await this.shopsModel.findById(id);
    return shop;
  }

  async update(
    id: string,
    updateShopDto: UpdateShopDto,
  ): Promise<ShopsDocument> {
    const shop = await this.findOne(id);
    const { new_name, new_email, new_desc, new_categories, new_products } =
      updateShopDto;

    if (new_name) {
      shop.name = new_name;
    }
    if (new_email) {
      shop.email = new_email;
    }
    if (new_desc) {
      shop.desc = new_desc;
    }
    if (new_categories) {
      shop.categories = new_categories;
    }
    if (new_products) {
      shop.products = [...shop.products, ...new_products];
    }

    const updatedShop = await this.shopsModel.findByIdAndUpdate(id, shop, {
      new: true,
    });
    return updatedShop;
  }

  async remove(id: string): Promise<string> {
    return `This action removes a #${id} shop`;
  }
}
