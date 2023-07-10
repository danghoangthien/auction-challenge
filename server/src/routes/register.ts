import { Router } from 'express';
import registerBidder from '../controllers/register';

const router = Router();

router.post('', registerBidder);

export default router;