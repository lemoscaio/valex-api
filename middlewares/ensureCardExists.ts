import { Request, Response, NextFunction } from "express"

import * as cardRepository from "../repositories/cardRepository.js"

export async function ensureCardExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { cardId }: { cardId: number } = req.body

  const card = await cardRepository.findById(cardId)
  console.log("🚀 ~ card", card)

  if (!card) {
    throw { status: 404, message: "Card doesn't exist" }
  }

  res.locals.card = card

  next()
}
