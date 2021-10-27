import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDto } from '../dto/users.dto';
import { Users } from '../schemas/users.schema';

@Controller('users')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  allUsers(): IResData<Users[]> {
    return this.usersService.getAll();
  }

  @Post('/sign-up')
  userSignUp(@Body() userDto: UserDto): IResData<Users> {
    return this.usersService.create(userDto);
  }

  @Post('/login')
  userLogin(@Body() userDto: UserDto): IResData<Users> {
    return this.usersService.login(
      userDto.password,
      userDto.username,
      userDto.email,
    );
  }

  @Put(':username')
  userInfoUpdate(
    @Param('username') username: string,
    @Body() userDto: UserDto,
  ): IResData<Users> {
    return this.usersService.update(username, userDto);
  }
}
