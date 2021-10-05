import express from 'express';
import cors from 'cors';
import config from './config/config';
import logger from './config/logger';
import connectToDB from './db/db.connect';
/** routes */
import userRouter from './routers/user.router';
import testRouter from './routers/test.router';

const namespace = 'server';
const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  })
);

const routeAddress = (ext: string): string => {
  return `/api/v1${ext}`;
};

app.use(routeAddress('/user'), userRouter);
app.use(routeAddress('/test'), testRouter);

(function () {
  connectToDB();

  app.listen(config.PORT, () => {
    logger.info({
      namespace,
      status: 200,
      message: 'Server listening on port ' + config.PORT,
    });
  });
})();
