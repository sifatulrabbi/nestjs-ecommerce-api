// prettier-ignore
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UsersDocument } from '../users';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  private noPermission(): void {
    throw new ForbiddenException('Insufficient permission');
  }

  private matchOwner(user: UsersDocument, id: string): boolean {
    if (user.shop_id === id) {
      return true;
    } else {
      this.noPermission();
    }
  }

  private matchAdmin(user: UsersDocument): boolean {
    if (user.name === 'admin' && user.email === 'admin@exp.com') {
      return true;
    } else {
      this.noPermission();
    }
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as UsersDocument;
    const params = request.params;

    if (!roles || !user) {
      this.noPermission();
    } else if (roles.find((role) => role === 'owner')) {
      return this.matchOwner(user, params['id']);
    } else if (roles.find((role) => role === 'admin')) {
      return this.matchAdmin(user);
    } else {
      this.noPermission();
    }
  }
}
