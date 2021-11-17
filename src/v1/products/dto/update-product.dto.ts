// prettier-ignore
import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { LoginUserDto } from '../../users';

export class UpdateProductDto extends LoginUserDto {
  @IsString()
  @IsOptional()
  new_name?: string;

  @IsString()
  @IsOptional()
  new_desc?: string;

  @IsNumber()
  @IsOptional()
  new_price?: number;

  @IsString()
  @IsOptional()
  new_category?: string;

  @IsArray()
  @IsOptional()
  new_tags?: string[];
}
