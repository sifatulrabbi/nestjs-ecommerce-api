import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersSchema } from '../users';
import { ShopsSchema } from '../shops';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'users', schema: UsersSchema },
      { name: 'shops', schema: ShopsSchema },
    ]),
  ],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
