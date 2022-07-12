import { NextFunction, Request, Response } from "express"

export function validateOnlinePaymentCardData(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next()
}
