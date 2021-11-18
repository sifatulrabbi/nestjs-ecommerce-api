// prettier-ignore
import { BadRequestException, ForbiddenException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model, NativeError, ObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersDocument } from './entities';
import { IUser, IUserPreview } from 'src/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private usersModel: Model<UsersDocument>,
  ) {}

  private async hashString(str: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(str, salt);

    return hash;
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

  async findAll(): Promise<IUserPreview[]> {
    const users: IUserPreview[] = await this.usersModel.find(
      {},
      'name email _id shop_name shop_id',
    );

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

  async findByEmail(email: string): Promise<UsersDocument | undefined> {
    const user = await this.usersModel.findOne({ email });
    if (user) {
      return user;
    }
    throw new NotFoundException('user not found');
  }

  async update(
    user: UsersDocument,
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UsersDocument> {
    if (user.id !== userId) {
      throw new ForbiddenException(
        'Your are forbidden from changing this data',
      );
    }

    const updateQueue: IUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    if (updateUserDto.new_password) {
      if (!updateUserDto.new_confirm_password) {
        throw new HttpException('confirm_password is required', 400);
      }
      if (updateUserDto.new_password === updateUserDto.new_confirm_password) {
        const hash = await this.hashString(updateUserDto.new_password);
        updateQueue.password = hash;
      } else throw new HttpException("passwords don't match", 400);
    }
    if (updateUserDto.new_email) {
      updateQueue.email = updateUserDto.new_email;
    }
    if (updateUserDto.new_name) {
      updateQueue.name = updateUserDto.new_name;
    }
    if (updateUserDto.new_shop_id) {
      updateQueue.shop_id = updateUserDto.new_shop_id;
    }
    if (updateUserDto.new_shop_name) {
      updateQueue.shop_name = updateUserDto.new_shop_name;
    }

    const updatedUser = await this.usersModel.findByIdAndUpdate(
      userId,
      { ...updateQueue },
      { new: true },
    );
    if (!updatedUser) {
      throw new BadRequestException(
        'Unable to update user please try again later',
      );
    }
    return updatedUser;
  }

  async remove(userId: string): Promise<string> {
    await this.usersModel
      .findByIdAndRemove(userId)
      .catch((err: NativeError) => {
        throw new BadRequestException(err);
      });
    return `User removed`;
  }
}
