import * as express from 'express';
import { UsersService } from '../../services';
import { validateUserData } from '../../middlewares';
import { userAuth } from '../../middlewares';

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
 * @route /user/:userid
 * @middlewares none
 */
router.get('/:userid', provider.getUser);

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
 * @route /user/:userid
 * @middlewares validateUserData, userAuth
 */
router.put('/:userid', userAuth, validateUserData, provider.update);

/**
 * @method DELETE
 * @route /user/:userid
 * @middlewares userAuth
 */
router.delete('/:userid', userAuth, provider.delete);

usersController.use('/users', router);
export default usersController;
