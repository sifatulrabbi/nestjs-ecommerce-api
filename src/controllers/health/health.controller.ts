import * as express from 'express';
import { HealthService } from '../../services/health/health.service';

const healthController = express();
const router = express.Router();
const provider = new HealthService();

router.get('/', provider.healthGet);

router.post('/', provider.healthPost);

healthController.use('/health', router);
export default healthController;
