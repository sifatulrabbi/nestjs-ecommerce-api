import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { ShopsSchema } from './entities';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'shops', schema: ShopsSchema }]),
  ],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports: [ShopsService],
})
export class ShopsModule {}
