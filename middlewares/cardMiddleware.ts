import dayjs from "dayjs"
import { Request, Response, NextFunction } from "express"

import * as cardRepository from "../repositories/cardRepository.js"
import { addAndFormatDateExistingDate } from "../utils/dateFunctions.js"
import { security } from "../utils/encryptionFunctions.js"

async function getAndPassToLocals(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let card: cardRepository.Card

  if (req.body.cardId || req.query.cardId) {
    const cardId: number = req.body.cardId || req.query.cardId

    if (req.body.cardId && req.query.cardId) {
      throw {
        status: 400,
        message:
          "card identifier must be passed on request body OR query string, not both",
      }
    }

    card = await cardRepository.findById(cardId)
  } else if (req.body.cardNumber) {
    const cardNumber: string = req.body.cardNumber
    const cardholderName: string = req.body.cardholderName
    const cardExpirationDate: string = req.body.cardExpirationDate

    card = await cardRepository.findByCardDetails(
      cardNumber,
      cardholderName,
      cardExpirationDate,
    )
  }

  console.log("🚀 ~ card", card)

  res.locals.card = card

  next()
}

function ensureExistance(req: Request, res: Response, next: NextFunction) {
  const card: cardRepository.Card = res.locals.card

  if (!card) {
    throw { status: 404, message: "Card doesn't exist" }
  }

  next()
}

function ensureIsNotExpired(req: Request, res: Response, next: NextFunction) {
  console.log("ensureCardIsNotExpired")
  const card: cardRepository.Card = res.locals.card

  const expirationMonth = card.expirationDate.slice(0, 2)
  const expirationYear = card.expirationDate.slice(3, 5)
  const expirationFullDate = `${expirationMonth}/01/${expirationYear}`
  const expirationFormattedDate = addAndFormatDateExistingDate(
    1,
    "month",
    expirationFullDate,
  )
  const cardIsExpired = dayjs().isAfter(expirationFormattedDate)

  if (cardIsExpired) throw { status: 400, message: "Expired card" }

  next()
}

function validateSecurityCode(req: Request, res: Response, next: NextFunction) {
  const card: cardRepository.Card = res.locals.card
  const { securityCode }: { securityCode: string } = req.body

  const decryptedCode = security.decryptSecurityCode(card.securityCode)
  if (securityCode !== decryptedCode)
    throw { status: 401, message: "Wrong security code" }

  next()
}

function ensureIsNotActivated(req: Request, res: Response, next: NextFunction) {
  const card: cardRepository.Card = res.locals.card

  if (card.password) throw { status: 400, message: "Card already activated" }

  next()
}

function ensureIsActivated(req: Request, res: Response, next: NextFunction) {
  const card: cardRepository.Card = res.locals.card

  if (!card.password) throw { status: 400, message: "Card is not activated" }

  next()
}

function validatePassword(req: Request, res: Response, next: NextFunction) {
  console.log("validateCardPassword")
  const card: cardRepository.Card = res.locals.card
  const password: string = req.body.password

  const decryptedPassword = security.decryptPassword(password, card.password)

  if (!decryptedPassword) throw { status: 401, message: "Wrong password" }

  next()
}

function ensureIsNotBlocked(req: Request, res: Response, next: NextFunction) {
  const card: cardRepository.Card = res.locals.card

  if (card.isBlocked) throw { status: 400, message: "The card is blocked" }

  next()
}

function ensureIsBlocked(req: Request, res: Response, next: NextFunction) {
  const card: cardRepository.Card = res.locals.card

  if (!card.isBlocked) throw { status: 400, message: "The card is unblocked" }

  next()
}

function ensureIsNotVirtual(req: Request, res: Response, next: NextFunction) {
  const card: cardRepository.Card = res.locals.card

  if (card.isVirtual)
    throw { status: 400, message: "This card is a virtual card" }

  next()
}

function ensureIsVirtual(req: Request, res: Response, next: NextFunction) {
  const card: cardRepository.Card = res.locals.card

  if (!card.isVirtual)
    throw { status: 400, message: "This card is not a virtual card" }

  next()
}

const card = {
  getAndPassToLocals,
  ensureExistance,
  ensureIsNotExpired,
  validateSecurityCode,
  ensureIsNotActivated,
  ensureIsActivated,
  validatePassword,
  ensureIsNotBlocked,
  ensureIsBlocked,
  ensureIsNotVirtual,
  ensureIsVirtual,
}

export { card }
