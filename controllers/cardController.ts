import { Request, Response } from "express"

import * as cardRepository from "../repositories/cardRepository.js"
import * as cardService from "../services/cardService.js"

export async function createCard(req: Request, res: Response) {
  const { cardType }: { cardType: cardRepository.TransactionTypes } = req.body
  const { employee } = res.locals

  await cardService.createCard(employee, cardType)

  return res.sendStatus(200)
}
