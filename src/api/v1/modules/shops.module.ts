import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ShopsSchema } from '../models';
import { ShopsController } from '../controllers';
import { ShopsService } from '../services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Shops', schema: ShopsSchema }]),
  ],
  controllers: [ShopsController],
  providers: [ShopsService],
  exports: [],
})
export class ShopsModule {}
