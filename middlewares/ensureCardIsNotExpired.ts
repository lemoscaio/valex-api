import { Request, Response, NextFunction } from "express"
import dayjs from "dayjs"

export async function ensureCardIsNotExpired(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const card: { expirationDate: string } = res.locals.card

  const expirationFullDate = dayjs(`01/${card.expirationDate}`).format()
  const cardIsExpired = dayjs().isAfter(expirationFullDate)

  if (cardIsExpired) throw { status: 400, message: "Expired card" }

  next()
}
