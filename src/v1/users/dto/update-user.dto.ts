import { IsString, IsEmail, Length, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  new_name: string;

  @IsEmail()
  @IsOptional()
  new_email: string;

  @Length(8, 26)
  @IsString()
  @IsOptional()
  new_password: string;

  @Length(8, 26)
  @IsString()
  @IsOptional()
  confirm_password: string;

  @IsString()
  @IsOptional()
  shop_id?: string;

  @IsString()
  @IsOptional()
  shop_name?: string;
}
