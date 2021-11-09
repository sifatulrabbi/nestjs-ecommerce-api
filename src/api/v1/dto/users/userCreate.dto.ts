import { IUser } from 'src/interfaces';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserCreateDto implements IUser {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
