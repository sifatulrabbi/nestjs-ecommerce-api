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

  @IsEmail()
  @IsOptional()
  new_email?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  desc?: string;

  @IsArray()
  @IsOptional()
  categories?: string[];

  @IsArray()
  @IsOptional()
  products?: string[];

  @Length(8, 26)
  @IsString()
  @IsOptional()
  new_password?: string;

  @Length(8, 26)
  @IsString()
  @IsOptional()
  confirm_password?: string;
}
