import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto } from '../dto/users.dto';
import { Users } from '../schemas/users.schema';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Post('/sign-up')
  userSignUp(@Body() userDto: UserDto): Promise<IResultData<Users>> {
    return this.usersService.create(userDto);
  }

  @Post('/login')
  userLogin(@Body() userDto: UserDto): Promise<IResultData<Users>> {
    return this.usersService.login(
      userDto.password,
      userDto.username,
      userDto.email,
    );
  }
}
