import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ShopsDocument } from '../shops';
import { UsersDocument } from '../users';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users')
    private readonly usersModel: Model<UsersDocument>,
    @InjectModel('shops')
    private readonly shopsModel: Model<ShopsDocument>,
  ) {}

  private async verifyPassword(
    user: UsersDocument,
    password: string,
  ): Promise<UsersDocument> {
    const isAlike = await bcrypt.compare(password, user.password);
    if (!isAlike) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async verifyWithEmail(
    email: string,
    password: string,
  ): Promise<UsersDocument> {
    const user = await this.usersModel.findOne({ email });
    if (!user) {
      throw new NotFoundException();
    }

    return await this.verifyPassword(user, password);
  }

  async verifyWithId(id: string, password: string): Promise<UsersDocument> {
    const user = await this.usersModel.findById(id);
    if (!user) {
      throw new NotFoundException();
    }

    return await this.verifyPassword(user, password);
  }

  async verifyUserShop(
    email: string,
    password: string,
    shopId: string,
  ): Promise<[UsersDocument, ShopsDocument]> {
    const user = await this.verifyWithEmail(email, password);
    const shop = await this.shopsModel.findById(shopId);

    if (user._id !== shop.owner_id || user.name !== shop.owner_name) {
      throw new UnauthorizedException();
    }

    return [user, shop];
  }
}
