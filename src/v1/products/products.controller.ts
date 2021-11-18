// prettier-ignore
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { LocalAuthGuard, RolesGuard } from '../guards';
import { Roles } from '../decorators';
import { IProduct } from 'src/interfaces';

@Controller({ version: '1', path: 'products' })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Promise<IProduct[]> {
    return this.productsService.findAll();
  }

  @Roles('admin')
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<IProduct> {
    return this.productsService.create(createProductDto);
  }

  @Get(':productId')
  findOne(@Param('productId') productId: string): Promise<IProduct> {
    return this.productsService.findOne(productId);
  }

  @Roles('admin')
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Put(':productId')
  update(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<IProduct> {
    return this.productsService.update(productId, updateProductDto);
  }

  @Roles('admin')
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Delete(':productId')
  remove(@Param('productId') productId: string): Promise<string> {
    return this.productsService.remove(productId);
  }
}
