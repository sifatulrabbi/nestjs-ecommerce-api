// prettier-ignore
import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { UsersDocument } from '../users';
import { IProduct, IShop } from 'src/interfaces';
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
  getAllProducts(@Param('shopId') shopId: string): Promise<IProduct[]> {
    return this.productsService.findAllForShop(shopId);
  }

  @Get(':shopId/products/:productId')
  getAProduct(
    @Param('shopId') shopId: string,
    @Param('productId') productId: string,
  ): Promise<IProduct> {
    return this.productsService.findOneForShop(shopId, productId);
  }

  @UseGuards(LocalAuthGuard, RolesGuard)
  @Roles('owner', 'admin')
  @Post(':shopId/products')
  async createProduct(
    @Param('shopId') shopId: string,
    @Body() createProductDto: CreateProductDto,
  ): Promise<IProduct> {
    const product = await this.productsService.create(createProductDto, shopId);
    const productId: string = product.id;
    const updateDto = {
      email: createProductDto.email,
      password: createProductDto.password,
      new_products: [productId],
    };
    this.shopsService.update(shopId, updateDto);

    return product as IProduct;
  }

  @UseGuards(LocalAuthGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Put(':shopId/products/:productId')
  updateProduct(
    @Param('shopId') shopId: string,
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<IProduct> {
    return this.productsService.update(productId, updateProductDto);
  }

  @UseGuards(LocalAuthGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Delete(':shopId/products/:productId')
  removeProduct(
    @Param('shopId') shopId: string,
    @Param('productId') productId: string,
  ): Promise<string> {
    return this.productsService.remove(productId);
  }
}
