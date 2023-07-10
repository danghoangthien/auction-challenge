import { body } from 'express-validator';

export const resister = [body('email').isEmail().withMessage('email is invalid')];
