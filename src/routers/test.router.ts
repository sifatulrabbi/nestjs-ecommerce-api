import { Router } from 'express';
import logger from '../config/logger';

const testRouter = Router();
const namespace = 'USER ROUTE';

testRouter.get('/', async (req, res) => {
    try {
        res.status(200).json({ message: 'hello world!' });
    } catch (error) {
        res.status(500).send(error);
        logger.error({
            namespace,
            status: 500,
            message: `${error}`,
        });
    }
});

export default testRouter;
