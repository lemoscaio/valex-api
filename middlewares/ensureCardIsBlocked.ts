import { Request, Response, NextFunction } from "express"

export async function ensureCardIsBlocked(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const card: { isBlocked: boolean } = res.locals.card

  if (!card.isBlocked) throw { status: 400, message: "Card already unblocked" }

  next()
}
