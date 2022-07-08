import { Request, Response, NextFunction } from "express"

export async function ensureCardIsNotBlocked(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const card: { isBlocked: boolean } = res.locals.card

  if (card.isBlocked) throw { status: 400, message: "Card already blocked" }

  next()
}
