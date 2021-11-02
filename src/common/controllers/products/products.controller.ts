import * as express from 'express';
import { ProductsService } from '../../services';
import { validateProductData, addProductToShop } from '../../middlewares';

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

/**
 * @method POST a product
 * @route /products
 * @middlewares validateProductData, addProductToShop
 */
router.post('/', validateProductData, provider.create, addProductToShop);

/**
 * @method PUT a product
 * @route /products/:productid
 * @middlewares validateProductData
 */
router.post('/', validateProductData, provider.create);

productsController.use('/products', router);
export default productsController;
