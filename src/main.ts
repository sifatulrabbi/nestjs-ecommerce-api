import * as express from 'express';
import {
  config,
  connectDb,
  controllers,
  loggerMiddleware,
  initStrategy,
} from './v1';
import * as cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.all('/api/v1/*', loggerMiddleware);
app.use('/api/v1', controllers);

(function (port: number): void {
  initStrategy();

  app.listen(port, () => {
    connectDb();
    console.log(`server is running at port ${port}`);
  });
})(config.port);
