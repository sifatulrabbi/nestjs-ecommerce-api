import { Module } from '@nestjs/common';
import { DatabaseModule } from './configs';
import {
  UsersModule,
  ShopsModule,
  ProductsModule,
  CategoriesModule,
} from './modules';
import { ConfigsModule } from './configs';
import { AppController } from './controllers';
@Module({
  imports: [
    ConfigsModule,
    DatabaseModule,
    UsersModule,
    ShopsModule,
    ProductsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
