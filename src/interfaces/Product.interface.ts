import { ObjectId } from 'mongoose';

export interface IProduct {
  _id?: ObjectId;
  name: string;
  desc: string;
  price: number;
  shop: ObjectId;
  category: string;
}
