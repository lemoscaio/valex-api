import { Request, Response, NextFunction } from "express"

import * as cardRepository from "../repositories/cardRepository.js"

export async function ensureCardExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const cardId: number = req.body.cardId || req.query.cardId

  if (req.body.cardId && req.query.cardId) {
    throw {
      status: 400,
      message:
        "card identifier must be passed on request body OR query string, not both",
    }
  }

  const card = await cardRepository.findById(cardId)
  console.log("🚀 ~ card", card)

  if (!card) {
    throw { status: 404, message: "Card doesn't exist" }
  }

  res.locals.card = card

  next()
}
