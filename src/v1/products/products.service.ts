// prettier-ignore
import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';

import { ProductsDocument } from './entities';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { IProduct } from 'src/interfaces';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('products')
    private readonly productsModel: Model<ProductsDocument>,
  ) {}

  async findAll(): Promise<ProductsDocument[]> {
    const products: ProductsDocument[] = await this.productsModel.find({});
    return products;
  }

  async findAllForShop(shopId: string): Promise<ProductsDocument[]> {
    const products = await this.productsModel.find({ shop_id: shopId });
    if (products.length < 1) {
      throw new HttpException('No products yet. Please create one', 200);
    }
    return products;
  }

  async findOne(productId: string): Promise<ProductsDocument> {
    const product = await this.productsModel.findById(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findOneForShop(
    shopId: string,
    productId: string,
  ): Promise<ProductsDocument> {
    const product = await this.productsModel.findOne({
      shop_id: shopId,
      _id: productId,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async create(
    createProductDto: CreateProductDto,
    shopId?: string,
  ): Promise<ProductsDocument> {
    const newProduct = new this.productsModel({
      ...createProductDto,
      shop_id: shopId,
    });

    const createdProduct = await newProduct.save();

    if (!createdProduct) {
      throw new InternalServerErrorException(
        'Unable to create product please try agin',
      );
    }
    return createdProduct;
  }

  async update(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductsDocument> {
    const product = await this.findOne(productId);

    const data: IProduct = {
      name: product.name,
      desc: product.desc,
      category: product.category,
      price: product.price,
      tags: product.tags,
      shop_id: product.shop_id,
    };

    if (updateProductDto.new_name) {
      data.name = updateProductDto.new_name;
    }

    if (updateProductDto.new_desc) {
      data.desc = updateProductDto.new_desc;
    }

    if (updateProductDto.new_price) {
      data.price = updateProductDto.new_price;
    }

    if (updateProductDto.new_category) {
      data.category = updateProductDto.new_category;
    }

    if (updateProductDto.new_tags) {
      if (data.tags) {
        data.tags = [...data.tags, ...updateProductDto.new_tags];
      } else {
        data.tags = updateProductDto.new_tags;
      }
    }

    const updatedProduct = product.update({ ...data }, { new: true });

    return updatedProduct;
  }

  async remove(productId: string): Promise<string> {
    await this.productsModel.findByIdAndRemove(productId).catch((err) => {
      throw new BadRequestException(err);
    });

    return `Product deleted`;
  }
}
