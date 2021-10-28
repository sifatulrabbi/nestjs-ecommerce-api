import * as mongoose from 'mongoose';

export type ProductDocument = IProduct & mongoose.Document;

const productSchema = new mongoose.Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
    },
    shop_id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: Array,
  },
  { timestamps: true },
);

const productModel = mongoose.model<ProductDocument>('product', productSchema);

export default productModel;
