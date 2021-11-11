import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model, ObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersDocument } from './models/users.model';
import { LoginUserDto } from '.';
import { IUser } from 'src/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private readonly usersModel: Model<UsersDocument>,
  ) {}

  private async hashString(str: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(str, salt);

    return hash;
  }

  private async compareString(str: string, hash: string): Promise<boolean> {
    const compare = await bcrypt.compare(str, hash);

    return compare;
  }

  private async findUserByIdAndAuth(
    id: string,
    password: string,
  ): Promise<UsersDocument> {
    const user = await this.usersModel.findById(id);

    if (user && (await this.compareString(password, user.password))) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }

  private async findUserAndAuth(
    email: string,
    password: string,
  ): Promise<UsersDocument> {
    const user = await this.usersModel.findOne({ email });

    if (user && (await this.compareString(password, user.password))) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }

  async create(createUserDto: CreateUserDto): Promise<UsersDocument> {
    if (await this.usersModel.findOne({ email: createUserDto.email })) {
      throw new HttpException('email already in use', 400);
    }

    const hashedPass = await this.hashString(createUserDto.password);

    const newUser = new this.usersModel({
      ...createUserDto,
      password: hashedPass,
    });
    const createdUser = await newUser.save();

    if (!createdUser) {
      throw new InternalServerErrorException();
    }
    return createdUser;
  }

  async findAll(): Promise<UsersDocument[]> {
    const users = await this.usersModel.find({});

    if (!users) {
      throw new InternalServerErrorException();
    }
    return users;
  }

  async findOne(id: string | ObjectId): Promise<UsersDocument> {
    const user = await this.usersModel.findById(id);

    if (!user) {
      throw new HttpException('Unable to find any user', 500);
    }
    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<UsersDocument> {
    const user = await this.findUserAndAuth(
      loginUserDto.email,
      loginUserDto.password,
    );

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UsersDocument> {
    const user = await this.findUserByIdAndAuth(id, updateUserDto.password);

    const {
      new_email,
      new_name,
      new_password,
      confirm_password,
      shop_name,
      shop_id,
    } = updateUserDto;

    const updateQueue: IUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    if (new_password) {
      if (!confirm_password) {
        throw new HttpException('confirm_password is required', 400);
      }
      if (new_password === confirm_password) {
        const hash = await this.hashString(new_password);
        updateQueue.password = hash;
      } else throw new HttpException("passwords don't match", 400);
    }
    if (new_email) {
      updateQueue.email = new_email;
    }
    if (new_name) {
      updateQueue.name = new_name;
    }
    if (shop_id) {
      updateQueue.shop_id = shop_id;
    }
    if (shop_name) {
      updateQueue.shop_name = shop_name;
    }

    return await this.usersModel.findByIdAndUpdate(
      id,
      { ...updateQueue },
      { new: true },
    );
  }

  async remove(id: string, loginUserDto: LoginUserDto) {
    const user = await this.findUserByIdAndAuth(id, loginUserDto.password);

    user.remove();
    return `User removed`;
  }
}
