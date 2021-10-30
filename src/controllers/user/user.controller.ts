import * as express from 'express';
import { UsersService } from '../../services/user/user.service';
import { validateUserData, userAuth } from '../../middlewares';

const usersController = express();
const router = express.Router();
const provider = new UsersService();

/**
 * @method GET
 * @route /user
 * @middlewares none
 */
router.get('/', provider.getAll);

/**
 * @method GET
 * @route /user/:id
 * @middlewares none
 */
router.get('/:id', provider.getUser);

/**
 * @method POST
 * @route /user/sign-up
 * @middlewares validateUserData
 */
router.post('/sign-up', validateUserData, provider.create);

/**
 * @method POST
 * @route /user/login
 * @middlewares userAuth
 */
router.post('/login', userAuth, provider.login);

/**
 * @method PUT
 * @route /user/:id
 * @middlewares validateUserData, userAuth
 */
router.put('/:id', validateUserData, userAuth, provider.update);

/**
 * @method DELETE
 * @route /user/:id
 * @middlewares userAuth
 */
router.delete('/:id', userAuth, provider.delete);

usersController.use('/users', router);
export default usersController;
