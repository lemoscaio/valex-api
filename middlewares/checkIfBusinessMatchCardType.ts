import { NextFunction, Request, Response } from "express"

import * as cardRepository from "../repositories/cardRepository.js"
import * as businessRepository from "../repositories/businessRepository.js"

export async function checkIfBusinessMatchCardType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const card: cardRepository.CardUpdateData = res.locals.card
  const business: businessRepository.Business = res.locals.business

  if (card.type !== business.type)
    throw {
      status: 400,
      message: "the card type doesn't match the business type",
    }

  next()
}
