import * as express from 'express';
import { UsersService } from '../../services/users/users.service';
import { validateUserData, userVerification } from '../../middlewares';

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
 * @middlewares userVerification
 */
router.post('/login', userVerification, provider.login);

/**
 * @method PUT
 * @route /user/:userid
 * @middlewares validateUserData, userVerification
 */
router.put('/:userid', userVerification, validateUserData, provider.update);

/**
 * @method DELETE
 * @route /user/:userid
 * @middlewares userVerification
 */
router.delete('/:userid', userVerification, provider.delete);

usersController.use('/users', router);
export default usersController;
