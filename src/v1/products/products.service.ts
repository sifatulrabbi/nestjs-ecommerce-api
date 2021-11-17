import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto): string {
    console.log(createProductDto);
    return 'This action adds a new product';
  }

  findAll(): string {
    return `This action returns all products`;
  }

  findOne(id: string): string {
    return `This action returns a #${id} product`;
  }

  update(id: string, updateProductDto: UpdateProductDto): string {
    console.log(updateProductDto);
    return `This action updates a #${id} product`;
  }

  remove(id: string): string {
    return `This action removes a #${id} product`;
  }
}
