import { Module } from '@nestjs/common';
import { HealthCheckController } from './controllers/health-check.controller';
import { HealthCheckService } from './services/health-check.service';

@Module({
    imports: [],
    controllers: [HealthCheckController],
    providers: [HealthCheckService],
})
export class HealthCheckModule {}
