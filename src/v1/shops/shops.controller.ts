// prettier-ignore
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { UsersDocument } from '../users';
import { IShop } from 'src/interfaces';
import { User, Roles } from '../decorators';
import { LocalAuthGuard, RolesGuard } from '../guards';

@Controller({ version: '1', path: 'shops' })
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  create(
    @User() user: UsersDocument,
    @Body() createShopDto: CreateShopDto,
  ): Promise<IShop> {
    return this.shopsService.create(user, createShopDto);
  }

  @Get()
  findAll(): Promise<IShop[]> {
    return this.shopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IShop> {
    return this.shopsService.findOne(id);
  }

  @UseGuards(LocalAuthGuard, RolesGuard)
  @Roles('owner', 'admin')
  @Put(':id')
  update(
    @User() user: UsersDocument,
    @Param('id') id: string,
    @Body() updateShopDto: UpdateShopDto,
  ): Promise<IShop> {
    return this.shopsService.update(id, updateShopDto);
  }

  @UseGuards(LocalAuthGuard, RolesGuard)
  @Roles('owner', 'admin')
  @Delete(':id')
  remove(
    @User() user: UsersDocument,
    @Param('id') id: string,
  ): Promise<string> {
    return this.shopsService.remove(id);
  }
}
