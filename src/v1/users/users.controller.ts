// prettier-ignore
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';

import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { UsersService } from './users.service';
import { IUser, IUserPreview } from 'src/interfaces';
import { LocalAuthGuard } from '../guards';
import { UsersDocument } from '.';

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
  login(@Req() req: Request): Promise<IUserPreview> {
    return this.usersService.login(req);
  }

  @UseGuards(LocalAuthGuard)
  @Put(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body('update_data') updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    return this.usersService.update(
      req.user as UsersDocument,
      id,
      updateUserDto,
    );
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
