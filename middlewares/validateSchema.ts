import { NextFunction, Request, Response } from "express"
import Joi from "joi"

export function validateSchema(schema: Joi.ObjectSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("tried to run the schema")
    await schema.validateAsync(req.body, { abortEarly: false })

    next()
  }
}
