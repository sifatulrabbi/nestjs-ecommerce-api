import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env['MONGODB_URI'],
      }),
    }),
  ],
})
export class DatabaseModule {}
