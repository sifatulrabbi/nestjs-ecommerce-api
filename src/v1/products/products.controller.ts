// prettier-ignore
import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { LocalAuthGuard, RolesGuard } from '../guards';
import { Roles } from '../decorators';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles('admin')
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto): string {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(): string {
    return this.productsService.findAll();
  }

  @Get(':productId')
  findOne(@Param('productId') productId: string): string {
    return this.productsService.findOne(productId);
  }

  @Roles('admin')
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Put(':productId')
  update(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ): string {
    return this.productsService.update(productId, updateProductDto);
  }

  @Roles('admin')
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Delete(':productId')
  remove(@Param('productId') productId: string): string {
    return this.productsService.remove(productId);
  }
}
