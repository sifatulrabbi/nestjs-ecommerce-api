// prettier-ignore
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { UsersDocument } from '../users';
import { IShop } from 'src/interfaces';
import { User, Roles } from '../decorators';
import { LocalAuthGuard, RolesGuard } from '../guards';
import { ProductsService } from '../products';
import { CreateProductDto, UpdateProductDto } from '../products/dto';

@Controller({ version: '1', path: 'shops' })
export class ShopsController {
  constructor(
    private readonly shopsService: ShopsService,
    private readonly productsService: ProductsService,
  ) {}

  /********************************************************
   * @for handling shops
   * @provider shopsService
   *******************************************************/

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

  @Get(':shopId')
  findOne(@Param('shopId') id: string): Promise<IShop> {
    return this.shopsService.findOne(id);
  }

  @UseGuards(LocalAuthGuard, RolesGuard)
  @Roles('owner', 'admin')
  @Put(':shopId')
  update(
    @User() user: UsersDocument,
    @Param('shopId') id: string,
    @Body() updateShopDto: UpdateShopDto,
  ): Promise<IShop> {
    return this.shopsService.update(id, updateShopDto);
  }

  @UseGuards(LocalAuthGuard, RolesGuard)
  @Roles('owner', 'admin')
  @Delete(':shopId')
  remove(
    @User() user: UsersDocument,
    @Param('shopId') id: string,
  ): Promise<string> {
    return this.shopsService.remove(id);
  }

  /********************************************************
   * @for handling products
   * @provider productsService
   *******************************************************/

  @Get(':shopId/products')
  getAllProducts(@Param('shopId') shopId: string): string {
    console.log(shopId);
    return this.productsService.findAll();
  }

  @Get(':shopId/products/:productId')
  getAProduct(@Param('productId') productId: string): string {
    return this.productsService.findOne(productId);
  }

  @UseGuards(LocalAuthGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Post(':shopId/products')
  createProduct(
    @Param('shopId') shopId: string,
    @Body('product') createProductDto: CreateProductDto,
  ): string {
    createProductDto.shop_id = shopId;
    return this.productsService.create(createProductDto);
  }

  @UseGuards(LocalAuthGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Put(':shopId/products/:productId')
  updateProduct(
    @Param('shopId') shopId: string,
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): string {
    return this.productsService.update(productId, updateProductDto);
  }

  @UseGuards(LocalAuthGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Delete(':shopId/products/:productId')
  removeProduct(
    @Param('shopId') shopId: string,
    @Param('productId') productId: string,
  ): string {
    return this.productsService.remove(productId);
  }
}
