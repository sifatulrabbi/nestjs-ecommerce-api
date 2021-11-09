import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { ProductsService } from '../services';
import { IProduct } from 'src/interfaces';
import { ProductCreateDto, UserCreateDto } from '../dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /******************************************************************
   * @returns array of products
   * @path url/products
   * @method GET
   *****************************************************************/
  @Get('/')
  getAllProducts(): Promise<IProduct[]> {
    return this.productsService.getAll();
  }

  /********************************************************************
   * @returns single product
   * @path url/products/:productid
   * @method GET
   *******************************************************************/
  @Get('/:productid')
  getAProduct(@Param('productid') productid: string): Promise<IProduct> {
    return this.productsService.getOne(productid);
  }

  /********************************************************************
   * @returns single product
   * @path url/products
   * @method POST
   * @redirectsTo url/products/:productid
   *******************************************************************/
  @Post('/')
  // @Redirect('http://localhost:5000/products/:productid')
  async create(
    @Body('product') product: ProductCreateDto,
    @Body('user') user: UserCreateDto,
  ) {
    const createdProduct: IProduct = await this.productsService.create(product);

    if (createdProduct && createdProduct._id) {
      // return {
      //   url: `https://localhost:5000/products/${product._id}`,
      //   statusCode: 201,
      // };
      return createdProduct;
    }
  }
}
