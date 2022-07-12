import { Request, Response, NextFunction } from "express"

import * as businessRepository from "../repositories/businessRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"

async function getAndPassToLocals(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const businessId: number = req.body.businessId

  const business = await businessRepository.findById(businessId)
  console.log("🚀 ~ business", business)

  res.locals.business = business

  next()
}

function ensureExistance(req: Request, res: Response, next: NextFunction) {
  const business: businessRepository.Business = res.locals.business

  if (!business) {
    throw { status: 404, message: "Business not registered" }
  }

  next()
}

function ensureMatchesCardType(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const card: cardRepository.Card = res.locals.card
  const business: businessRepository.Business = res.locals.business

  if (card.type !== business.type)
    throw {
      status: 400,
      message: "the card type doesn't match the business type",
    }

  next()
}

const business = {
  getAndPassToLocals,
  ensureExistance,
  ensureMatchesCardType,
}

export { business }
