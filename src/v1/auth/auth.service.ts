import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersDocument, UsersService } from '../users';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validate(email: string, password: string): Promise<UsersDocument> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
