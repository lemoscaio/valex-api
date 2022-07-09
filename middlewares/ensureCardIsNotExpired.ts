import { Request, Response, NextFunction } from "express"
import dayjs from "dayjs"
import {
  addAndFormatDateExistingDate,
  getNowAddAndFormatDate,
} from "../utils/dateFunctions.js"

export async function ensureCardIsNotExpired(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log("ensureCardIsNotExpired")
  const card: { expirationDate: string } = res.locals.card

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
