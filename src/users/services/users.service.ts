import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from '../schemas/users.schema';
import { UserDto } from '../dto/users.dto';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('users') private usersModel: Model<UsersDocument>) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    const hashedPass = await hash(password, salt);

    return hashedPass;
  }

  private async findUser(username?: string, email?: string): Promise<Users> {
    if (username) {
      return this.usersModel.findOne({ username });
    }
    if (email) {
      return this.usersModel.findOne({ email });
    }
  }

  private async checkUser(password: string, user?: Users): IResData<Users> {
    const data = {
      statusCode: 404,
      message: 'User does not exists please sign up first',
      data: null,
      error: '',
    };
    if (!user) return data;

    if (await compare(password, user.password)) {
      data.statusCode = 201;
      data.message = 'Login successful';
      data.data = user;
      return data;
    } else {
      data.message =
        'Unable to login. Please check your username/email and password then try again';
      data.error = 'incorrect credentials';
    }
  }

  /** @method getAllUser */
  async getAll(): IResData<Users[]> {
    const data = {
      statusCode: 201,
      message: 'All users data',
      data: null,
      error: '',
    };

    data.data = await this.usersModel.find({});
    return data;
  }

  /** @method signUp */
  async create(userDto: UserDto): IResData<Users> {
    const data = {
      statusCode: 500,
      message: 'Unable to sign up please try again',
      data: null,
      error: '',
    };

    try {
      const hashedPass = await this.hashPassword(userDto.password);
      userDto.password = hashedPass;
      const newUser = new this.usersModel(userDto);
      const createdUser = await newUser.save();

      data.statusCode = 201;
      data.data = createdUser;
      data.message = 'Sign up complete';
      return data;
    } catch (err) {
      data.error = err as string;
      return data;
    }
  }

  /** @method login */
  async login(
    password: string,
    username?: string,
    email?: string,
  ): IResData<Users> {
    if (username) {
      const user = await this.usersModel.findOne({ username });
      return this.checkUser(password, user);
    } else if (email) {
      const user = await this.usersModel.findOne({ email });
      return this.checkUser(password, user);
    }
  }

  /** @method update */
  async update(username: string, userDto: UserDto): IResData<Users> {
    const data = {
      statusCode: 404,
      message: 'User not found',
      data: null,
      error: '',
    };
    const user = await this.findUser(username);

    if (user) {
      const updatedUser = await this.usersModel.findOneAndUpdate(
        { username },
        userDto,
      );
      data.statusCode = 201;
      data.message = 'User info updated';
      data.data = updatedUser;
      return data;
    } else {
      data.error = 'Unable to find user';
      return data;
    }
  }
}
