// prettier-ignore
import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, NativeError } from 'mongoose';

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

  private async updateUser(
    user: UsersDocument,
    shop: ShopsDocument,
  ): Promise<void> {
    await user
      .updateOne({ shop_id: shop.id, shop_name: shop.name })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  }

  async create(
    user: UsersDocument,
    createShopDto: CreateShopDto,
  ): Promise<ShopsDocument> {
    const newShop = new this.shopsModel({
      ...createShopDto,
      owner_name: user.name,
      owner_id: user._id,
    });

    const createdShop = await newShop.save().catch((err: NativeError) => {
      throw new BadRequestException(err);
    });

    if (!createdShop) {
      throw new BadRequestException('Unable to create shop');
    }

    await this.updateUser(user, createdShop);

    return createdShop;
  }

  async findAll(): Promise<ShopsDocument[]> {
    const shops: ShopsDocument[] = await this.shopsModel
      .find({})
      .catch((err: NativeError) => {
        throw new BadRequestException(err);
      });
    return shops;
  }

  async findOne(id: string): Promise<ShopsDocument> {
    const shop = await this.shopsModel
      .findById(id)
      .catch((err: NativeError) => {
        throw new BadRequestException(err);
      });

    if (!shop) {
      throw new NotFoundException('shop not found!');
    }
    return shop;
  }

  async update(
    shopId: string,
    updateShopDto: UpdateShopDto,
  ): Promise<ShopsDocument> {
    const shop = await this.findOne(shopId);

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
      shop.categories = [...shop.categories, ...updateShopDto.new_categories];
    }
    if (updateShopDto.new_products) {
      if (shop.products) {
        shop.products = [...shop.products, ...updateShopDto.new_products];
      } else {
        shop.products = [...updateShopDto.new_products];
      }
    }

    const updatedShop = await this.shopsModel
      .findByIdAndUpdate(shopId, shop, {
        new: true,
      })
      .catch((err: NativeError) => {
        throw new BadRequestException(err);
      });

    if (!updatedShop) {
      throw new BadRequestException('Unable to update the shop');
    }

    return updatedShop;
  }

  async remove(shopId: string): Promise<string> {
    const shop = await this.findOne(shopId);
    return shop
      .remove()
      .then(() => 'Shop deleted')
      .catch((err: NativeError) => {
        throw new BadRequestException(err);
      });
  }
}
