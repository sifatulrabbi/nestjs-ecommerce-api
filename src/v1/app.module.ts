import { Module } from '@nestjs/common';

import { DatabaseModule, ConfigsModule } from './configs';

import { AppService } from './app.service';
import { UsersModule } from './users';
import { ShopsModule } from './shops';
import { AppController } from './app.controller';
import { AuthModule } from './auth';
@Module({
  imports: [
    ConfigsModule,
    DatabaseModule,
    UsersModule,
    ShopsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
