import { ObjectId } from 'mongoose';

export interface IUser {
  _id?: ObjectId;
  username: string;
  full_name: string;
  password: string;
  shop_id?: ObjectId;
}
