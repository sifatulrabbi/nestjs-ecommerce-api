import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsModel } from './entities';

@Module({
  imports: [ProductsModel],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsModel, ProductsService],
})
export class ProductsModule {}
