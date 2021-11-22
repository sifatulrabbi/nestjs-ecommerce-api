// prettier-ignore
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { UsersService } from './users.service';
import { IUserPreview } from 'src/interfaces';
import { LocalAuthGuard } from '../guards';
import { UsersDocument } from '.';
import { User } from '../decorators';

@Controller({ version: '1', path: 'users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private async filerUser(user: Promise<UsersDocument>): Promise<IUserPreview> {
    const resUser = await user;
    return {
      name: resUser.name,
      email: resUser.email,
      shop_id: resUser.shop_id,
      shop_name: resUser.shop_name,
    };
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<IUserPreview> {
    return this.filerUser(this.usersService.create(createUserDto));
  }

  @Get()
  findAll(): Promise<IUserPreview[]> {
    return this.usersService.findAll();
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string): Promise<IUserPreview> {
    return this.filerUser(this.usersService.findOne(userId));
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@User() user: UsersDocument): IUserPreview {
    if (!user) throw new NotFoundException('User not found');
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      shop_id: user.shop_id,
      shop_name: user.shop_name,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Put(':userId')
  update(
    @User() user: UsersDocument,
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IUserPreview> {
    return this.filerUser(
      this.usersService.update(user, userId, updateUserDto),
    );
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':userId')
  async remove(
    @Param('userId') userId: string,
    // eslint-disable-next-line no-unused-vars
    @Body() loginUserDto: LoginUserDto,
  ): Promise<string> {
    return this.usersService.remove(userId);
  }
}
