import { Router } from 'express';
import { placeBid } from '../controllers/bid';

const router = Router();

router.post('/place', placeBid);

export default router;
