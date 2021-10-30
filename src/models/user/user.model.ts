import * as mongoose from 'mongoose';
import { IUser } from 'globals';

const usersSchema = new mongoose.Schema<IUser>(
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

const usersModel = mongoose.model<IUser>('user', usersSchema);

export default usersModel;
