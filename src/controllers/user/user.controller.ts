import * as express from 'express';
import { UserService } from '../../services/user/user.service';
import { validateUserData, userAuth } from '../../middlewares';

const userController = express();
const router = express.Router();
const provider = new UserService();

/**
 * @Method GET
 * @Route /user
 * @Middlewares none
 */
router.get('/', provider.getAll);

/**
 * @Method GET
 * @Route /user/:id
 * @Middlewares none
 */
router.get('/:id', provider.getUser);

/**
 * @Method POST
 * @Route /user/sign-up
 * @Middlewares validateUserData
 */
router.post('/sign-up', validateUserData, provider.create);

/**
 * @Method POST
 * @Route /user/login
 * @Middlewares userAuth
 */
router.post('/login', userAuth, provider.login);

/**
 * @Method PUT
 * @Route /user/:id
 * @Middlewares validateUserData, userAuth
 */
router.put('/:id', validateUserData, userAuth, provider.update);

/**
 * @Method DELETE
 * @Route /user/:id
 * @Middlewares userAuth
 */
router.delete('/:id', userAuth, provider.delete);

userController.use('/user', router);
export default userController;
