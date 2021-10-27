import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopController } from './controllers/shop.controller';
import { ShopSchema } from './schemas/shop.schema';
import { ShopService } from './services/shop.service';
import { ValidateData } from './middlewares/validate-data.middleware';
import { UsersSchema } from '../users/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'shop', schema: ShopSchema },
      { name: 'users', schema: UsersSchema },
    ]),
  ],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateData)
      .forRoutes(
        { path: 'shop/create', method: RequestMethod.POST },
        { path: 'shop', method: RequestMethod.PUT },
      );
  }
}
