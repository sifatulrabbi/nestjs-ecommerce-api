import * as express from 'express';
import { usersService } from '../../services';
import { validateUserData } from '../../middlewares';
import { userAuth } from '../../middlewares';
import * as passport from 'passport';

const usersController = express();
const router = express.Router();

/**
 * @method GET
 * @route /user
 * @middlewares none
 */
router.get('/', usersService.getAll);

/**
 * @method GET
 * @route /user/:userid
 * @middlewares none
 */
router.get('/:userid', usersService.getUser);

/**
 * @method POST
 * @route /user/sign-up
 * @middlewares validateUserData
 */
router.post('/sign-up', validateUserData, usersService.create);

/**
 * @method POST
 * @route /user/login
 * @middlewares userAuth
 */
router.post(
  '/login',
  passport.authenticate('local'),
  userAuth,
  usersService.login,
);

/**
 * @method PUT
 * @route /user/:userid
 * @middlewares validateUserData, userAuth
 */
router.put('/:userid', userAuth, validateUserData, usersService.update);

/**
 * @method DELETE
 * @route /user/:userid
 * @middlewares userAuth
 */
router.delete('/:userid', userAuth, usersService.delete);

usersController.use('/users', router);
export default usersController;
