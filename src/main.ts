import * as express from 'express';
import { config } from './config';
import { connectDb } from './db';
import * as cors from 'cors';
import { contentTypeCheck, controllers, loggerMiddleware } from './common';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.all('/api/v1/*', loggerMiddleware, contentTypeCheck);
app.use('/api/v1', controllers);

(function (port: number): void {
  app.listen(port, () => {
    connectDb();
    console.log(`server is running at port ${port}`);
  });
})(config.port);
