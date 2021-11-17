// prettier-ignore
import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { LoginUserDto } from '../../users';

export class UpdateProductDto extends LoginUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  desc: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsString()
  @IsOptional()
  category: string;

  @IsArray()
  @IsOptional()
  tags: string;
}
