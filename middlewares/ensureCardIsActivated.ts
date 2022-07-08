import { Request, Response, NextFunction } from "express"

export async function ensureCardIsActivated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const card: { password: string } = res.locals.card

  if (!card.password) throw { status: 400, message: "Card is not activated" }

  next()
}
