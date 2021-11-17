import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginUserDto } from './login-user.dto';

export class UpdateUserDto extends LoginUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  new_name!: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  new_email!: string;

  @ApiProperty({ required: false, minLength: 8 })
  @MinLength(8)
  @IsString()
  @IsOptional()
  new_password!: string;

  @ApiProperty({ required: false, minLength: 8 })
  @MinLength(8)
  @IsString()
  @IsOptional()
  new_confirm_password!: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  new_shop_id?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  new_shop_name?: string;
}
