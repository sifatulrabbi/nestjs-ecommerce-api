import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ShopsDocument } from './entities';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { UsersDocument } from '../users';

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

    return newShop;
  }

  async findAll(): Promise<string> {
    return `This action returns all shops`;
  }

  async findOne(id: string): Promise<string> {
    return `This action returns a #${id} shop`;
  }

  async update(id: string, updateShopDto: UpdateShopDto): Promise<string> {
    return `This action updates a #${id} shop`;
  }

  async remove(id: string): Promise<string> {
    return `This action removes a #${id} shop`;
  }
}
