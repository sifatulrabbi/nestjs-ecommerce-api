import { usersModel } from '../models';
import { IUser } from 'src/typings';
import { checkPassword } from './checkPassword';

interface ILoginInfo {
  username: string;
  password: string;
}

export const checkUser = async ({
  username,
  password,
}: ILoginInfo): Promise<IUser> => {
  const user = await usersModel.findOne({ name: username });

  if (await checkPassword(password, user.password)) {
    return user;
  } else {
    throw new Error('username password incorrect');
  }
};
