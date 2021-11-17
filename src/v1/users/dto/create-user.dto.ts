import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type { IUser } from 'src/interfaces';

export class CreateUserDto implements IUser {
  @ApiProperty({ required: true })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ required: true, minLength: 8 })
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name!: string;
}
