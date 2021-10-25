import { Test, TestingModule } from '@nestjs/testing';
import { ShopService } from './shop.service';

describe('ShopService', () => {
    let service: ShopService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ShopService],
        }).compile();

        service = module.get<ShopService>(ShopService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
