import * as express from 'express';
import { UserService } from '../../services/user/user.service';
import { validateUser } from '../../middlewares/validate-user.middleware';

const userController = express();
const router = express.Router();
const provider = new UserService();

router.get('/', provider.getAll);

router.post('/sign-up', [validateUser, provider.create]);

router.post('/login', provider.login);

router.put('/:username', [validateUser, provider.update]);

router.delete('/:username', provider.delete);

userController.use('/user', router);
export default userController;
