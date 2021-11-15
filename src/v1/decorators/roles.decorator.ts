import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]): CustomDecorator<string> => {
  return SetMetadata('roles', roles);
};
