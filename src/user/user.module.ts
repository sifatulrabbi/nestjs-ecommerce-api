import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
