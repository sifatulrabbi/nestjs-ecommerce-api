import { Module } from '@nestjs/common';

import { DatabaseModule, ConfigsModule } from './configs';
import {
  UsersModule,
  ShopsModule,
  ProductsModule,
  CategoriesModule,
} from './modules';

@Module({
  imports: [
    ConfigsModule,
    DatabaseModule,
    UsersModule,
    ShopsModule,
    ProductsModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
