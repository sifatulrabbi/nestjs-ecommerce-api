import { Module } from '@nestjs/common';

import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { ShopModel } from './entities';
import { ProductsService } from '../products';

@Module({
  imports: [ShopModel, ProductsService],
  controllers: [ShopsController],
  providers: [ShopsService, ProductsService],
  exports: [ShopsService],
})
export class ShopsModule {}
