import * as express from 'express';
import { ShopsService } from '../../services';
import {
  addShopToUser,
  userShopVerification,
  userVerification,
  validateShopData,
} from '../../middlewares';

const shopController = express();
const router = express.Router();
const provider = new ShopsService();

/**
 * @method GET all shops
 * @route /shops
 * @middlewares none
 */
router.get('/', provider.getShops);

/**
 * @method GET get a shop
 * @route /shops
 * @middlewares none
 */
router.get('/:shopid', provider.getAShop);

/**
 * @method POST create a shop
 * @route /shops
 * @middlewares userVerification, validateShopData
 */
router.post(
  '/',
  userVerification,
  validateShopData,
  provider.createShop,
  addShopToUser,
);

/**
 * @method PUT update shop
 * @route /shops/:shopid
 * @middlewares userVerification, validateShopData
 */
router.put(
  '/:shopid',
  userVerification,
  userShopVerification,
  validateShopData,
  provider.updateShop,
);

/**
 * @method DELETE delete a shop
 * @route /shops/:shopid
 * @middlewares userVerification
 */
router.delete(
  '/:shopid',
  userVerification,
  userShopVerification,
  provider.deleteShop,
);

shopController.use('/shops', router);
export default shopController;
