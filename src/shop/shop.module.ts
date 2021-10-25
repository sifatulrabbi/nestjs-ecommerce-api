import { Module } from '@nestjs/common';
import { ShopController } from './controllers/shop.controller';
import { ShopService } from './services/shop.service';

@Module({
    controllers: [ShopController],
    providers: [ShopService],
})
export class ShopModule {}
