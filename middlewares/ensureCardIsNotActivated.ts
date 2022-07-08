import { Request, Response, NextFunction } from "express"

export async function ensureCardIsNotActivated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const card: { password: string } = res.locals.card

  if (card.password) throw { status: 400, message: "Card already activated" }

  next()
}
