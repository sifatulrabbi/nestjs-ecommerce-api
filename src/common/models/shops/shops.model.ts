import * as mongoose from 'mongoose';
import { IShop } from 'src/typings';

export type ShopsDocument = IShop & mongoose.Document;

const shopsSchema = new mongoose.Schema<IShop>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    owner: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
    },

    categories: [],

    products: [],

    ownerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const shopsModel = mongoose.model<ShopsDocument>('shops', shopsSchema);

export default shopsModel;
