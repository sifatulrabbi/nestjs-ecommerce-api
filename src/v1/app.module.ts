import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { DatabaseModule, ConfigsModule } from './configs';

import { AppService } from './app.service';
import { UsersModule } from './users';
import { ShopsModule } from './shops';
import { AppController } from './app.controller';
import { AuthModule } from './auth';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './middlewares';
@Module({
  imports: [
    ConfigsModule,
    DatabaseModule,
    UsersModule,
    ShopsModule,
    AuthModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
