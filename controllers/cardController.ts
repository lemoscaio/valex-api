import { Request, Response } from "express"

import * as cardRepository from "../repositories/cardRepository.js"
import * as cardService from "../services/cardService.js"
import * as rechargeService from "../services/rechargeService.js"
import { security } from "../utils/encryptionFunctions.js"

export async function createCard(req: Request, res: Response) {
  const { cardType }: { cardType: cardRepository.TransactionTypes } = req.body
  const { employee } = res.locals

  await cardService.createCard(employee, cardType)

  return res.sendStatus(201)
}

export async function setCardPassword(req: Request, res: Response) {
  const card: cardRepository.CardUpdateData = res.locals.card
  const { password }: { password: string } = req.body

  const hashPassword = security.encryptPassword(password)

  await cardService.updateCard(card.id, { password: hashPassword })

  return res.sendStatus(200)
}

export async function getEmployeeCards(req: Request, res: Response) {
  return res.sendStatus(200)
}

export async function getCardBalanceAndStatements(req: Request, res: Response) {
  const cardId = +req.query.cardId

  const cardBalanceAndStatements =
    await cardService.gatherCardBalanceAndStatements(cardId)

  return res.send(cardBalanceAndStatements)
}

export async function blockCard(req: Request, res: Response) {
  const card: cardRepository.CardUpdateData = res.locals.card

  await cardService.updateCard(card.id, {
    isBlocked: true,
  })

  return res.sendStatus(200)
}

export async function unblockCard(req: Request, res: Response) {
  const card: cardRepository.CardUpdateData = res.locals.card

  await cardService.updateCard(card.id, {
    isBlocked: false,
  })

  return res.sendStatus(200)
}

export async function rechargeCard(req: Request, res: Response) {
  const card: cardRepository.CardUpdateData = res.locals.card
  const amount: number = req.body.amount

  await rechargeService.rechargeCarge(card.id, amount)

  return res.sendStatus(200)
}
