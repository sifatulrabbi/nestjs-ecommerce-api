// prettier-ignore
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { UsersService } from './users.service';
import { IUser } from 'src/interfaces';

@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IUser> {
    return this.usersService.findOne(id);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto): Promise<IUser> {
    return this.usersService.login(loginUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Body() loginUserDto: LoginUserDto,
  ): Promise<string> {
    return this.usersService.remove(id, loginUserDto);
  }
}
