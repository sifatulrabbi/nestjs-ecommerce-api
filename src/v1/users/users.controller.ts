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

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IUser> {
    return this.usersService.findOne(id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@User() user: UsersDocument): Promise<IUserPreview> {
    return this.usersService.login(user);
  }

  @UseGuards(LocalAuthGuard)
  @Put(':id')
  update(
    @User() user: UsersDocument,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUserPreview> {
    return this.usersService.update(user, id, updateUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Body() loginUserDto: LoginUserDto,
  ): Promise<string> {
    return this.usersService.remove(id, loginUserDto);
  }
}
