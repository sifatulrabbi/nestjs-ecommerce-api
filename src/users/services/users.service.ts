import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../schemas/users.schema';
import { UserDto } from '../dto/users.dto';
import { genSalt, hash, compare } from 'bcrypt';
import { ILoginData } from '../interfaces/login-data.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private usersModel: Model<UsersDocument>) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    const hashedPass = await hash(password, salt);

    return hashedPass;
  }

  private async checkUser(password: string, user?: Users): Promise<ILoginData> {
    const data: ILoginData = {
      statusCode: 404,
      message: 'User does not exists please sign up first',
    };
    if (!user) return data;

    if (await compare(password, user.password)) {
      data.statusCode = 201;
      data.message = 'Login successful';
      data.user = user;
      return data;
    } else {
      data.message =
        'Unable to login. Please check your username/email and password then try again';
      data.error = 'incorrect credentials';
    }
  }

  async create(userDto: UserDto): Promise<Users> {
    const hashedPass = await this.hashPassword(userDto.password);
    userDto.password = hashedPass;
    const newUser = new this.usersModel(userDto);

    return await newUser.save();
  }

  async login(
    password: string,
    username?: string,
    email?: string,
  ): Promise<ILoginData> {
    if (username) {
      const user = await this.usersModel.findOne({ username });
      return this.checkUser(password, user);
    } else if (email) {
      const user = await this.usersModel.findOne({ email });
      return this.checkUser(password, user);
    }
  }
}
