import { Request, Response, NextFunction } from "express"

export async function ensureCardIsNotVirtual(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const card: { isVirtual: boolean } = res.locals.card

  if (card.isVirtual)
    throw { status: 400, message: "This card is a virtual card" }

  next()
}
