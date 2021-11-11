import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersModel } from './entities';
import { AuthModule } from '../auth';

@Module({
  imports: [UsersModel], // importing the auth module breaks the app
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
