import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ShopsDocument } from '../shops';
import { UsersDocument } from '../users';
import { UsersService } from '../users/users.service';
import { ShopsService } from '../shops/shops.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly shopsService: ShopsService,
  ) {}

  async validateUser(email: string, password: string): Promise<UsersDocument> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    throw new UnauthorizedException();
  }
}
