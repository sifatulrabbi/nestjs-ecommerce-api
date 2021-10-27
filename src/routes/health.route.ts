import { Router } from 'express';
import { HealthController } from '../controllers/health.controller';

const route = Router();
const controller = new HealthController();

route.get('/health', controller.get);

export default route;
