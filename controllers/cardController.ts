import { Request, Response } from "express"

import * as cardRepository from "../repositories/cardRepository.js"
import * as cardService from "../services/cardService.js"
import { encryptPassword } from "../utils/encryptPassword.js"

export async function createCard(req: Request, res: Response) {
  const { cardType }: { cardType: cardRepository.TransactionTypes } = req.body
  const { employee } = res.locals

  await cardService.createCard(employee, cardType)

  return res.sendStatus(201)
}

export async function setCardPassword(req: Request, res: Response) {
  const card: cardRepository.CardUpdateData = res.locals.card
  const { password }: { password: string } = req.body

  const hashPassword = encryptPassword(password)
  const cardData = cardService.createUpdateCardData({ password: hashPassword })

  await cardService.updateCard(card.id, cardData)

  return res.sendStatus(200)
}

export async function getEmployeeCards(req: Request, res: Response) {
  return res.sendStatus(200)
}
export async function getCardBalanceAndStatements(req: Request, res: Response) {
  return res.sendStatus(200)
}
