import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { UsersDocument } from '../../users';

Injectable();
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<UsersDocument> {
    const user = await this.authService.validate(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
