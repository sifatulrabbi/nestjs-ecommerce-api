import * as mongoose from 'mongoose';
import { IUser } from '../../types/User';

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    shop_id: {
      type: String,
    },
    shop_name: {
      type: String,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model<IUser>('user', userSchema);

export default userModel;
