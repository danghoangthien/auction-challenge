import { Router } from 'express';
import { createItem, listItems } from '../controllers/item';

const router = Router();

router.get('', listItems);
router.post('', createItem);

export default router;
