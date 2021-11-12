import { Module } from '@nestjs/common';

import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { ShopModel } from './entities';

@Module({
  imports: [ShopModel],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports: [ShopsService],
})
export class ShopsModule {}
