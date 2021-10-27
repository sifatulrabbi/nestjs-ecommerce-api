import { Body, Controller, Get, Post, Put, Res } from '@nestjs/common';
import { ShopDto } from '../dto/shop.dto';
import { ShopService } from '../services/shop.service';
import { Response } from 'express';

@Controller('shop')
export class ShopController {
  constructor(private shopService: ShopService) {}

  @Get()
  getAll(@Res() res: Response): void {
    this.shopService.getAll(res);
  }

  @Post('/create')
  createShop(@Res() res: Response, @Body() shopDto: ShopDto): void {
    this.shopService.create(res, shopDto);
  }

  @Post()
  login(
    @Res() res: Response,
    @Body() body: { username: string; password: string },
  ): void {
    this.shopService.login(res, body.username, body.password);
  }

  @Put('/:id')
  update(
    @Res() res: Response,
    @Body() body: { username: string; password: string; shop: ShopDto },
  ): void {
    this.shopService.update(res, body.username, body.password, body.shop);
  }
}
