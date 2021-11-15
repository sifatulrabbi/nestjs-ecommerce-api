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

    if (updateShopDto.new_name) {
      shop.name = updateShopDto.new_name;
    }
    if (updateShopDto.new_email) {
      shop.email = updateShopDto.new_email;
    }
    if (updateShopDto.new_desc) {
      shop.desc = updateShopDto.new_desc;
    }
    if (updateShopDto.new_categories) {
      shop.categories = updateShopDto.new_categories;
    }
    if (updateShopDto.new_products) {
      shop.products = [...shop.products, ...updateShopDto.new_products];
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
