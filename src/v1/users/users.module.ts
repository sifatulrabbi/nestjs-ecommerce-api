import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersModel } from './entities';

@Module({
  imports: [UsersModel],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersModel, UsersService],
})
export class UsersModule {}
