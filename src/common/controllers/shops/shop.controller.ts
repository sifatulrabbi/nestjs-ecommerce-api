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
 * @middlewares userAuth, validateShopData
 */
router.post(
  '/',
  userAuth,
  validateShopData,
  provider.createShop,
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
  provider.updateShop,
);

/**
 * @method DELETE delete a shop
 * @route /shops/:shopid
 * @middlewares userAuth
 */
router.delete('/:shopid', userAuth, userShopVerification, provider.deleteShop);

shopController.use('/shops', router);
export default shopController;
