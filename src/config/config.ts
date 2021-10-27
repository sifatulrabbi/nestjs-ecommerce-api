import * as dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;

export default { mongoUri, port };
