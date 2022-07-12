import Joi from "joi"

export const deleteVirtualCardschema = Joi.object({
  cardId: Joi.number().required(),
  password: Joi.string().length(4).required(),
})
