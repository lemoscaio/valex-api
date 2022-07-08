import Joi from "joi"

export const rechargeSchema = Joi.object({
  cardId: Joi.number().required(),
  amount: Joi.number().integer().greater(0),
})
