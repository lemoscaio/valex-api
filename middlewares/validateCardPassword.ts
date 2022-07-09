import { Request, Response, NextFunction } from "express"
import { security } from "../utils/encryptionFunctions.js"

export function validateCardPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log("validateCardPassword")
  const card: { password: string } = res.locals.card
  const password: string = req.body.password

  const decryptedPassword = security.decryptPassword(password, card.password)

  if (!decryptedPassword) throw { status: 401, message: "Wrong password" }

  next()
}
