import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSchema } from './products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'products', schema: ProductsSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: 'products', schema: ProductsSchema }]),
  ],
})
export class ProductsModel {}
