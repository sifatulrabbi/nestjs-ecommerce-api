import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { ShopsSchema } from './models/shops.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'shops', schema: ShopsSchema }]),
  ],
  controllers: [ShopsController],
  providers: [ShopsService],
})
export class ShopsModule {}
