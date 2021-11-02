import * as express from 'express';
import { ProductsService } from '../../services/products/products.service';
import {} from '../../middlewares';

const productsController = express();
const router = express.Router();
const provider = new ProductsService();

/**
 * @method GET all products
 * @route /products
 * @middlewares none
 */
router.get('/', provider.getAll);

/**
 * @method GET a product
 * @route /products/:productid
 * @middlewares none
 */
router.get('/:productid', provider.getAProduct);

productsController.use('/products', router);
export default productsController;
