import { Module } from '@nestjs/common';
import { UsersModule } from '../users';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Module({
  imports: [UsersModule],
  providers: [AuthService, LocalAuthGuard],
  exports: [AuthService, LocalAuthGuard],
})
export class AuthModule {}
