import { Module } from '@nestjs/common';

import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { ShopModel } from './entities';
import { ProductsModule } from '../products';

@Module({
  imports: [ShopModel, ProductsModule],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports: [ShopsService],
})
export class ShopsModule {}
