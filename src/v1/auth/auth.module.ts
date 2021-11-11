import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies';
import { UsersService } from '../users';

@Module({
  imports: [PassportModule], // importing user service breaks the app
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
