import { Request, Response, NextFunction } from "express"

import * as cardRepository from "../repositories/cardRepository.js"

export async function ensureCardExistsFromNumber(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const cardNumber: string = req.body.cardNumber
  const cardHolderName: string = req.body.cardHolderName
  const cardExpirationDate: string = req.body.cardExpirationDate

  const card = await cardRepository.findByCardDetails(
    cardNumber,
    cardHolderName,
    cardExpirationDate,
  )
  console.log("🚀 ~ card", card)

  if (!card) {
    throw { status: 404, message: "Card doesn't exist" }
  }

  res.locals.card = card

  next()
}
