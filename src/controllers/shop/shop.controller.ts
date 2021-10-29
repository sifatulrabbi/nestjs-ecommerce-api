import * as express from 'express';
import { ShopService } from '../../services/shop/shop.service';

const shopController = express();
const router = express.Router();
const provider = new ShopService();

// router.get('/', provider.getAll);

// router.post('/create', provider.create);

// router.put('/:id', provider.create);

shopController.use('/shop', router);
export default shopController;
