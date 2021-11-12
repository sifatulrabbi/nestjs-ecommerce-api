// prettier-ignore
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersDocument, UsersService } from '../users';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<UsersDocument> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(
        'User not found please check your email or sign up',
      );
    }

    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException('User name or password incorrect');
  }
}
