import * as express from 'express';
import { categoriesService } from '../../services';

const categoriesController = express();
const router = express.Router();

/**
 * @method GET all categories
 * @route /categories
 * @middlewares none
 */
router.get('/', categoriesService.getAll);

categoriesController.use('/categories', router);
export default categoriesController;
