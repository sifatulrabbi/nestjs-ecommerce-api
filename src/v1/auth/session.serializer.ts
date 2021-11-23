import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersDocument, UsersService } from '../users';
import { IUserPreview, IUserSession } from 'src/interfaces';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(
    user: UsersDocument,
    done: (err: Error | null, user: IUserSession) => void,
  ): void {
    done(null, { id: user._id });
  }

  async deserializeUser(
    payload: IUserSession,
    done: (err: Error | null, user: IUserPreview) => void,
  ): Promise<void> {
    const userFromDb: UsersDocument = await this.usersService.findOne(
      payload.id,
    );

    done(null, {
      _id: userFromDb._id,
      email: userFromDb.email,
      name: userFromDb.name,
      shop_name: userFromDb.shop_name,
      shop_id: userFromDb.shop_id,
    });
  }
}
