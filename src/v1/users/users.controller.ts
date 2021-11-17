// prettier-ignore
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { UsersService } from './users.service';
import { IUser, IUserPreview } from 'src/interfaces';
import { LocalAuthGuard } from '../guards';
import { UsersDocument } from '.';
import { User } from '../decorators';

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

  @Get(':userId')
  findOne(@Param('userId') userId: string): Promise<IUser> {
    return this.usersService.findOne(userId);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@User() user: UsersDocument): Promise<IUserPreview> {
    return this.usersService.login(user);
  }

  @UseGuards(LocalAuthGuard)
  @Put(':userId')
  update(
    @User() user: UsersDocument,
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUserPreview> {
    return this.usersService.update(user, userId, updateUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':userId')
  async remove(
    @Param('userId') userId: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() loginUserDto: LoginUserDto,
  ): Promise<string> {
    return this.usersService.remove(userId);
  }
}
