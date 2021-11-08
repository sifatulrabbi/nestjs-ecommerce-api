import { ObjectId } from 'mongoose';

export interface ICategory {
  _id?: string;
  name: string;
  shops?: ObjectId[];
  products?: ObjectId[];
}
