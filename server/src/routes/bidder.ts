import { Router } from 'express';
import { deposit, getBidder } from '../controllers/bidder';

const router = Router();

router.get('', getBidder);
router.post('/deposit', deposit);

export default router;
