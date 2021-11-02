import * as express from 'express';
import { config } from './config';
import { connectDb } from './db';
import * as cors from 'cors';
import { controllers } from './common';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1', controllers);

app.listen(config.port, () => {
  connectDb();
  console.log(`server is running at port ${config.port}`);
});
