import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { IShop } from 'src/interfaces';

export class CreateShopDto implements IShop {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  desc: string;

  @IsString()
  @IsNotEmpty()
  owner_id: string;

  @IsString()
  @IsNotEmpty()
  owner_name: string;

  @IsArray()
  @IsNotEmpty()
  categories: string[];

  @IsArray()
  @IsOptional()
  products?: string[];
}
