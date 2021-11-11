import * as express from 'express';
import { productsService } from '../../services';

const productsController = express();
const router = express.Router();

/**
 * @method GET all products
 * @route /products
 * @middlewares none
 */
router.get('/', productsService.getAll);

/**
 * @method GET a product
 * @route /products/:productid
 * @middlewares none
 */
router.get('/:productid', productsService.getAProduct);

productsController.use('/products', router);
export default productsController;
