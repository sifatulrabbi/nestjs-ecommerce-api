import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({ required: true, minLength: 8 })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password!: string;
}
