import mongoose from 'mongoose';
import config from '../config/config';
import logger from '../config/logger';

const namespace = 'DB';

const connectToDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.MONGO_URI);
    logger.info({
      namespace,
      status: 200,
      message: 'Connected to mongoDB',
    });
  } catch (err) {
    logger.info({
      namespace,
      status: 200,
      message: err as string,
    });

    process.exit(1);
  }
};

export default connectToDB;
