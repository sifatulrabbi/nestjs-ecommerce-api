import * as express from 'express';
import { ShopService } from '../../services/shop/shop.service';
import { userAuth, validateShopData } from '../../middlewares';

const shopController = express();
const router = express.Router();
const provider = new ShopService();

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
router.get('/:id', provider.getAShop);

/**
 * @method POST create a shop
 * @route /shops
 * @middlewares userAuth, validateShopData
 */
router.post('/', userAuth, validateShopData, provider.createShop);

/**
 * @method PUT update shop
 * @route /shops/:id
 * @middlewares userAuth, validateShopData
 */
router.put('/:id', userAuth, validateShopData, provider.updateShop);

/**
 * @method DELETE delete a shop
 * @route /shops/:id
 * @middlewares userAuth
 */
router.delete('/:id', userAuth, provider.deleteShop);

shopController.use('/shops', router);
export default shopController;
