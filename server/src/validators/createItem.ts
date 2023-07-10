import Joi from 'joi';
import { ItemData } from '../types/ItemData';

export interface RequestBody {
  item_data: ItemData;
  ready_for_auction: boolean;
}

const itemDataSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  initial_price: Joi.number().positive().required(),
  time_window: Joi.number().positive().integer().required(),
});

const requestBodySchema = Joi.object<RequestBody>({
  item_data: itemDataSchema.required(),
  ready_for_auction: Joi.boolean().required(),
});

export default requestBodySchema;