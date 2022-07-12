import { Request, Response } from "express"

import * as virtualCardService from "../services/virtucalCardService.js"
import * as cardRepository from "../repositories/cardRepository.js"

export async function createVirtualCard(req: Request, res: Response) {
  const { password }: { password: string } = req.body
  const card: cardRepository.Card = res.locals.card

  await virtualCardService.createVirtualCard(card, password)

  res.send(201)
}

export async function deleteVirtualCard(req: Request, res: Response) {
  const card: cardRepository.Card = res.locals.card

  await cardRepository.remove(card.id)
}
