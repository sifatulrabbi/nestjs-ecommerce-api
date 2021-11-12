import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopsSchema } from './shops.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'shops', schema: ShopsSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: 'shops', schema: ShopsSchema }]),
  ],
})
export class ShopModel {}
