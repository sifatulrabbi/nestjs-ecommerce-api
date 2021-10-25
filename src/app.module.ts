import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckModule } from './health-check/health-check.module';
import { UserModule } from './user/user.module';
import { ShopModule } from './shop/shop.module';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [HealthCheckModule, UserModule, ShopModule, ProductsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
