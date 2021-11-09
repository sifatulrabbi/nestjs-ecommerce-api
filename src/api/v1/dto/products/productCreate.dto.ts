import { Schema } from 'mongoose';
import { IProduct } from 'src/interfaces';

import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class ProductCreateDto implements IProduct {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsNotEmpty()
  @IsInt()
  price: number;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  shop: Schema.Types.ObjectId;

  @IsNotEmpty()
  tags?: string[];
}
