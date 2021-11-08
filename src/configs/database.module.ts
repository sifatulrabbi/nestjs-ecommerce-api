import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: 'mongodb+srv://temujin:Savage0.5@my-database-01.ofame.mongodb.net/my-database-01?retryWrites=true&w=majority',
      }),
    }),
  ],
})
export class DatabaseModule {}
