import Joi from "joi"

export const paymentSchema = Joi.object({
  cardId: Joi.number().required(),
  businessId: Joi.number().required(),
  amount: Joi.number().integer().greater(0),
  password: Joi.string().length(4).required(),
})
