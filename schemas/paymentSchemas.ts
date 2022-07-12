import Joi from "joi"

export const paymentSchema = Joi.object({
  cardId: Joi.number().required(),
  businessId: Joi.number().required(),
  amount: Joi.number().integer().greater(0),
  password: Joi.string().length(4).required(),
})

export const onlinePaymentSchema = Joi.object({
  cardNumber: Joi.string().required(),
  cardholderName: Joi.string().required(),
  cardExpirationDate: Joi.string()
    .pattern(/((0[1-9]|1[012])\/[0-9]{2})/)
    .required(),
  securityCode: Joi.string().length(3).required(),
  businessId: Joi.number().required(),
  amount: Joi.number().integer().greater(0),
})
