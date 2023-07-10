import Joi from 'joi';

export const depositBidderSchema = (): Joi.ObjectSchema => {
  return Joi.object({
    amount: Joi.number().positive().required(),
  });
};