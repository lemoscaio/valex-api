import { Request, Response } from "express"

import * as paymentService from "../services/paymentService.js"
import * as cardRepository from "../repositories/cardRepository.js"

export async function insertPayment(req: Request, res: Response) {
  const card: cardRepository.CardUpdateData = res.locals.card
  const { businessId, amount }: { businessId: number; amount: number } =
    req.body

  if (card.isVirtual) {
    card.id = card.originalCardId
  }

  await paymentService.checkIfCardBalanceIsPositive(card.id, amount)
  await paymentService.insertNewPayment({ cardId: card.id, businessId, amount })

  res.sendStatus(200)
}
