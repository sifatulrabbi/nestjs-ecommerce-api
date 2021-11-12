import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginShopDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
