import * as mongoose from 'mongoose';
import { IProduct } from 'src/typings';

export type ProductsDocument = IProduct & mongoose.Document;

const productsSchema = new mongoose.Schema<IProduct>(
  {
    name: { type: String, required: true },

    desc: { type: String, required: true },

    price: { type: Number, required: true },

    photoURL: { type: String },

    shopId: { type: String, required: true },

    category: { type: String, required: true },

    tags: [],
  },
  { timestamps: true },
);

export const productsModel = mongoose.model<ProductsDocument>(
  'products',
  productsSchema,
);
