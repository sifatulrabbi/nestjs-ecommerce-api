import { Router } from 'express';
import controller from '../controllers/test.controller';

const testRouter = Router();

testRouter.route('/').get(controller.gettingTest).post(controller.postingTest);

export default testRouter;
