// prettier-ignore
import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDto } from '../../users';

export class CreateShopDto extends LoginUserDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  desc!: string;

  @ApiProperty({ required: true, isArray: true })
  @IsArray()
  @IsNotEmpty()
  categories!: string[];

  @ApiProperty({ required: false, isArray: true })
  @IsArray()
  @IsOptional()
  products?: string[];
}
