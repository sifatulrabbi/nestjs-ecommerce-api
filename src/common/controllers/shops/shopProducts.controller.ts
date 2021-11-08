import * as express from 'express';
import { productsService } from '../../services';
import {
  userAuth,
  addProductToShop,
  validateProductData,
} from '../../middlewares';

const shopProductsController = express();
const router = express.Router();

/**
 * @method GET get products
 * @route /shops/:shopid/products
 * @middlewares none
 */
router.get('/:shopid/products', productsService.getAllFromShop);

/**
 * @method GET get a product
 * @route /shops/:shopid/products/:productid
 * @middlewares userAuth, validateProductData
 */
router.get('/:shopid/products/:productid', productsService.getAProduct);

/**
 * @method POST create a product
 * @route /products
 * @middlewares userAuth, validateProductData
 */
router.post(
  '/:shopid/products',
  userAuth,
  validateProductData,
  productsService.create,
  addProductToShop,
);

/**
 * @method PUT update a product
 * @route /products/:productid
 * @middlewares userAuth, validateProductData
 */
router.put(
  '/:shopid/products/:productid',
  userAuth,
  validateProductData,
  productsService.update,
);

/**
 * @method DELETE remove a product
 * @route /products/:productid
 * @middlewares userAuth
 */
router.delete('/:shopid/products/:productid', userAuth, productsService.remove);

shopProductsController.use('/shops', router);
export default shopProductsController;
