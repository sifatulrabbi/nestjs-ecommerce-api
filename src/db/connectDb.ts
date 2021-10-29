import * as mongoose from 'mongoose';
import config from '../config/config';

export const connectDb = async () => {
    try {
        await mongoose.connect(config.mongoUri, {
            keepAlive: true,
            autoCreate: true,
        });
        console.log('connected to the db');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
