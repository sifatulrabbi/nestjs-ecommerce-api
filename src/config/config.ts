import dotenv from 'dotenv';

dotenv.config();

const PORT: string = String(process.env.PORT) || '5555';
const MONGO_URI: string = String(process.env.MONGO_URI);

export default { PORT, MONGO_URI };
