import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { HealthCheckService } from '../services/health-check.service';

@Controller('health')
export class HealthCheckController {
    constructor(private readonly healthCheckService: HealthCheckService) {}

    @Get()
    checkGet(): string {
        return this.healthCheckService.getTest();
    }

    @Post()
    checkPost(): string {
        return this.healthCheckService.postTest();
    }

    @Put()
    checkPut(): string {
        return this.healthCheckService.putTest();
    }

    @Delete()
    checkDelete(): string {
        return this.healthCheckService.deleteTest();
    }
}
