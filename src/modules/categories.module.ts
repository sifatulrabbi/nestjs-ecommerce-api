import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesSchema } from '../models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Categories', schema: CategoriesSchema },
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CategoriesModule {}
