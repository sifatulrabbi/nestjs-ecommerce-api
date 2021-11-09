import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from '../../../interfaces';
import { ProductCreateDto } from '../dto';
import { ProductsDocument } from '../models';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Products')
    private productsModel: Model<ProductsDocument>,
  ) {}

  async getAll(): Promise<IProduct[]> {
    const products = await this.productsModel.find({});

    if (!products) {
      throw 'products not found';
    }
    return products;
  }

  async getOne(productId: string): Promise<IProduct> {
    const product = await this.productsModel.findById(productId);

    if (!product) {
      throw 'product not found';
    }
    return product;
  }

  async create(product: ProductCreateDto): Promise<IProduct> {
    const newProduct = new this.productsModel(product);

    if (!newProduct) {
      throw 'unable to crate Product';
    }
    return newProduct;
  }
}
