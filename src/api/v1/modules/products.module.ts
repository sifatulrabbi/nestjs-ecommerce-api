import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from '../controllers';
import { ProductsSchema } from '../models';
import { ProductsService } from '../services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Products', schema: ProductsSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [],
})
export class ProductsModule {}
