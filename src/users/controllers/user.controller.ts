import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto } from '../dto/users.dto';
import { ILoginData } from '../interfaces/login-data.interface';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Post('/sign-up')
  createUser(@Body() userDto: UserDto): Promise<UserDto> {
    return this.usersService.create(userDto);
  }

  @Post('/login')
  userLogin(@Body() userDto: UserDto): Promise<ILoginData> {
    return this.usersService.login(
      userDto.password,
      userDto.username,
      userDto.email,
    );
  }
}
