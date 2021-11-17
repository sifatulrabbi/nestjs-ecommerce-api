// prettier-ignore
import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional } from 'class-validator';
import { LoginUserDto } from '../../users';

export class CreateProductDto extends LoginUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  desc!: string;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsArray()
  @IsOptional()
  tags!: string;
}
