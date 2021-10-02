import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import config from './config/config';
import logger from './config/logger';
/** routes */
import userRouter from './routers/user.router';
import testRouter from './routers/test.router';

const namespace = 'server';

dotenv.config();

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

app.listen(config.PORT, () => {
    logger.info({
        namespace,
        status: 200,
        message: 'Server listening on port ' + config.PORT,
    });
});
