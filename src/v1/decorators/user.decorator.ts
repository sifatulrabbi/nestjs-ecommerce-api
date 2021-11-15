import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsersDocument } from '../users';

export const User = createParamDecorator<string>(
  (data: string, context: ExecutionContext): UsersDocument => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as UsersDocument;

    return user;
  },
);
