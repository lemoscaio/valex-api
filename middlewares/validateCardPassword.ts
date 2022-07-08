import { Request, Response, NextFunction } from "express"
import { decryptPassword } from "../utils/encryptPassword.js"

export function validateCardPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const card: { password: string } = res.locals.card
  const password: string = req.body.password

  const decryptedPassword = decryptPassword(password, card.password)

  if (!decryptedPassword) throw { status: 401, message: "Wrong password" }

  next()
}
