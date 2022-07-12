import { Request, Response } from "express"

import * as virtualCardService from "../services/virtucalCardService.js"

export async function createVirtualCard(req: Request, res: Response) {
  const { password }: { password: string } = req.body
  const { card } = res.locals

  await virtualCardService.createVirtualCard(card, password)

  res.send(201)
}

export async function deleteVirtualCard(req: Request, res: Response) {
  res.send(900)
}
