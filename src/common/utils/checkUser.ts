import { usersModel } from '../models';
import { IUser } from 'src/typings';
import * as bcrypt from 'bcrypt';

export const checkUser = async (
  username: string,
  password: string,
): Promise<IUser> => {
  const user = await usersModel.findOne({ name: username });

  if (await bcrypt.compare(password, user.password)) {
    return user;
  } else {
    throw 'username password incorrect';
  }
};
