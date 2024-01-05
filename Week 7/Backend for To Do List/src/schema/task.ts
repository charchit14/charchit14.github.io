import Joi from 'joi';

export const taskSchema = Joi.object({
  id: Joi.string().trim().required(),
  title: Joi.string().trim().min(1).required(),
  description: Joi.string().trim().min(1).optional(),
  completed: Joi.boolean().optional(),
});
