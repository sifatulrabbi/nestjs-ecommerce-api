// prettier-ignore
import { IsString, IsArray, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDto } from '../../users';

export class UpdateShopDto extends LoginUserDto {
  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  new_email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  new_name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  new_desc?: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  new_categories?: string[];

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  new_products?: string[];
}
