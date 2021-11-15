// prettier-ignore
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';

import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { LocalAuthGuard } from '../guards';
import { UsersDocument } from '../users';
import { IShop } from 'src/interfaces';
import { User } from '../decorators';

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
  findAll() {
    return this.shopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopsService.findOne(id);
  }

  @UseGuards(LocalAuthGuard)
  @Put(':id')
  update(
    @User() user: UsersDocument,
    @Param('id') id: string,
    @Body() updateShopDto: UpdateShopDto,
  ) {
    return this.shopsService.update(id, updateShopDto);
  }

  @UseGuards(LocalAuthGuard)
  @Delete(':id')
  remove(@User() user: UsersDocument, @Param('id') id: string) {
    return this.shopsService.remove(id);
  }
}
