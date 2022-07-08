import { Request, Response, NextFunction } from "express"

import * as cardRepository from "../repositories/cardRepository.js"

export async function ensureEmployeeHasUniqueType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const {
    employeeId,
    cardType,
  }: { employeeId: number; cardType: cardRepository.TransactionTypes } =
    req.body

  const card = await cardRepository.findByTypeAndEmployeeId(
    cardType,
    employeeId,
  )
  console.log("🚀 ~ card", card)

  if (card) {
    throw {
      status: 409,
      message: "This employee already has a card of this type",
    }
  }

  next()
}
