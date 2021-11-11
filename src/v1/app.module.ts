import { Module } from '@nestjs/common';

import { DatabaseModule, ConfigsModule } from './configs';

import { UsersModule } from './users';
import { ShopsModule } from './shops';
@Module({
  imports: [ConfigsModule, DatabaseModule, UsersModule, ShopsModule],
})
export class AppModule {}
