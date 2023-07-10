import { Router } from 'express';
import * as User from '../controllers/user';
import * as UserValidator from '../validators/user';

const router = Router();

router.get('/get', User.getCurrentUser);

export default router;
