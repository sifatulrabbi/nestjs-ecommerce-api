import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

import type { IUser } from 'src/interfaces';

export class CreateUserDto implements IUser {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8, 26)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
