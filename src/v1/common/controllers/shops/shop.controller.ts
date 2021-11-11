import * as express from 'express';
import { shopsService, categoriesService } from '../../services';
import {
  addShopToUser,
  userShopVerification,
  userAuth,
  validateShopData,
} from '../../middlewares';

const shopController = express();
const router = express.Router();

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
  categoriesService.checkShopCategories,
  shopsService.createShop,
  addShopToUser,
);

/**
 * @method PUT update shop
 * @route /shops/:shopid
 * @middlewares userAuth,
 */
router.put(
  '/:shopid',
  userAuth,
  userShopVerification,
  categoriesService.checkShopCategories,
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

shopController.use('/shops', router);
export default shopController;
