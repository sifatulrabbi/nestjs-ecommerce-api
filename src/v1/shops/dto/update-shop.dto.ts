import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
  IsEmail,
  Length,
} from 'class-validator';

export class UpdateShopDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8, 26)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  new_name: string;

  @IsString()
  @IsNotEmpty()
  new_desc: string;

  @IsArray()
  @IsNotEmpty()
  categories: string[];

  @IsArray()
  @IsOptional()
  products?: string[];
}
