import { Request, Response, NextFunction } from "express"

import * as employeeRepository from "../repositories/employeeRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"

export async function getAndPassToLocals(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { employeeId }: { employeeId: number } = req.body

  const employee = await employeeRepository.findById(employeeId)

  console.log("🚀 ~ employee", employee)

  res.locals.employee = employee

  next()
}

function ensureExistance(req: Request, res: Response, next: NextFunction) {
  const employee: employeeRepository.Employee = res.locals.employee

  if (!employee) {
    throw { status: 404, message: "Employee doesn't exist" }
  }

  next()
}

async function ensureHasUniqueCardType(
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

const employee = {
  getAndPassToLocals,
  ensureExistance,
  ensureHasUniqueCardType,
}

export { employee }
