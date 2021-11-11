import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersService } from '../users/users.service';
import { ShopsService } from '../shops/shops.service';
import { UsersModel } from '../users';

@Module({
  imports: [UsersModel, UsersService, ShopsService],
  exports: [AuthService, LocalStrategy],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
