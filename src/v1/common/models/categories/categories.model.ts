import * as mongoose from 'mongoose';
import { ICategory } from 'src/typings';

export type CategoriesDocument = ICategory & mongoose.Document;

const categoriesSchema = new mongoose.Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  products: [{ id: String }],
  shops: [{ id: String }],
});

export const categoriesModel = mongoose.model<CategoriesDocument>(
  'categories',
  categoriesSchema,
);
