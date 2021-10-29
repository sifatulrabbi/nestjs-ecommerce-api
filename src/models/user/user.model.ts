import * as mongoose from 'mongoose';
import { IUser } from '../../types/User';

const userSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        fullName: {
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
        shopId: {
            type: String,
        },
        shopName: {
            type: String,
        },
    },
    { timestamps: true },
);

const userModel = mongoose.model<IUser>('user', userSchema);

export default userModel;
