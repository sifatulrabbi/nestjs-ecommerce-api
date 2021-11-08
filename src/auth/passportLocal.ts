import * as mongoose from 'mongoose';
import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { IUser } from 'src/typings';
import { usersModel } from '../common';
import * as bcrypt from 'bcrypt';

const verifyPassword = async (
  password: string,
  user: IUser,
): Promise<boolean> => {
  return await bcrypt.compare(password, user.password);
};

export const initStrategy = () => {
  passport.use(
    new LocalStrategy((username: string, password: string, done) => {
      usersModel.findOne(
        { username },
        async (err: mongoose.NativeError, user: IUser) => {
          console.log('ran');
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          if (await verifyPassword(password, user)) return done(null, false);
          return done(null, user);
        },
      );
    }),
  );
};
