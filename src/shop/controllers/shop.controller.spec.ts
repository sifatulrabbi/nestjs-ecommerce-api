import { Test, TestingModule } from '@nestjs/testing';
import { ShopController } from './shop.controller';

describe('ShopController', () => {
    let controller: ShopController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ShopController],
        }).compile();

        controller = module.get<ShopController>(ShopController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
