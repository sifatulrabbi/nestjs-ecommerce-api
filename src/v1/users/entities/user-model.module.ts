import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from './users.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }]),
  ],
})
export class UsersModel {}
