import { Router } from 'express';
import logger from '../config/logger';

const userRouter = Router();
const namespace = 'USER ROUTE';

userRouter.get('/', async (req, res) => {
    try {
        res.status(200);
    } catch (error) {
        res.status(500).send(error);
        logger.error({
            namespace,
            status: 500,
            message: `${error}`,
        });
    }
});

export default userRouter;
