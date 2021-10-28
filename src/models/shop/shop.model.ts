import * as mongoose from 'mongoose';

export type ShopDocument = IShop & mongoose.Document;

const shopSchema = new mongoose.Schema<IShop>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
    },
    categories: Array,
    items: Array,
    owner: {
      type: String,
      required: true,
    },
    owner_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const shopModel = mongoose.model<ShopDocument>('shop', shopSchema);

export default shopModel;
