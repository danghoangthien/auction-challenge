import { Router, Request, Response } from 'express';

const router = Router();

router.get('', async (_: Request, res: Response) => {
  return res.status(200).send('auction system health check OK');
});

export default router;