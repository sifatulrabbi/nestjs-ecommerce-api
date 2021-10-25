import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
    imports: [HealthCheckModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
