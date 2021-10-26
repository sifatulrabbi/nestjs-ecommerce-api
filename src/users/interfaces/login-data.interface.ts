import { Users } from '../schemas/users.schema';

export interface ILoginData {
  statusCode: number;
  message: string;
  user?: Users;
  error?: string;
}
