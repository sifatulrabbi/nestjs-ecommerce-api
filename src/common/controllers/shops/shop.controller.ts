import * as express from 'express';
import { ShopsService } from '../../services';
import {
  addShopToUser,
  userShopVerification,
  userAuth,
  validateShopData,
} from '../../middlewares';

const shopController = express();
const router = express.Router();
const shopsService = new ShopsService();

/**
 * @method GET all shops
 * @route /shops
 * @middlewares none
 */
router.get('/', shopsService.getShops);

/**
 * @method GET get a shop
 * @route /shops
 * @middlewares none
 */
router.get('/:shopid', shopsService.getAShop);

/**
 * @method POST create a shop
 * @route /shops
 * @middlewares userAuth, validateShopData
 */
router.post(
  '/',
  userAuth,
  validateShopData,
  shopsService.createShop,
  addShopToUser,
);

/**
 * @method PUT update shop
 * @route /shops/:shopid
 * @middlewares userAuth, validateShopData
 */
router.put(
  '/:shopid',
  userAuth,
  userShopVerification,
  validateShopData,
  shopsService.updateShop,
);

/**
 * @method DELETE delete a shop
 * @route /shops/:shopid
 * @middlewares userAuth
 */
router.delete(
  '/:shopid',
  userAuth,
  userShopVerification,
  shopsService.deleteShop,
);

// /**
//  * @method POST create a product
//  * @route /shops/:shopid/products
//  * @middlewares userAuth, validateProductData
//  */
// router.post(
//   '/:shopid/products',
//   userAuth,
//   validateProductData,
//   productsService.create,
//   addProductToShop,
// );

// /**
//  * @method PUT update a product
//  * @route /shops/:shopid/products/:productid
//  * @middlewares userAuth, validateProductData
//  */
// router.post(
//   '/:shopid/products',
//   userAuth,
//   validateProductData,
//   productsService.update,
// );

// /**
//  * @method DELETE remove a product
//  * @route /shops/:shopid/products/:productid
//  * @middlewares userAuth
//  */
// router.delete('/:shopid/products/:productid', userAuth, productsService.remove);
shopController.use('/shops', router);
export default shopController;
