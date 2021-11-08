import { ObjectId } from 'mongoose';

export interface IShop {
  _id?: ObjectId;
  name: string;
  desc: string;
  owner_id: ObjectId;
  categories: string[];
  products?: ObjectId[];
}
