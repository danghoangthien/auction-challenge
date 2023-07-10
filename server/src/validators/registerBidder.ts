import Joi from 'joi';

export const generateBidderSchema = (): Joi.ObjectSchema => {
  return Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    password_confirm: Joi.string().required().valid(Joi.ref('password')).messages({
      'any.only': 'Password and confirm password must match',
    }),
  });
};
