import { Router } from 'express';
import openAiQuestionRequest from '../controllers/openai';

const router = Router();

router.post('', openAiQuestionRequest);

export default router;