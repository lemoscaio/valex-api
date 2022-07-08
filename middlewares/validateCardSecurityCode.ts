import { Request, Response, NextFunction } from "express"
import { decryptSecurityCode } from "../utils/encryptPassword.js"

export async function validateCardSecurityCode(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const card: { securityCode: string } = res.locals.card
  const { securityCode }: { securityCode: string } = req.body

  const decryptedCode = decryptSecurityCode(card.securityCode)
  if (securityCode !== decryptedCode)
    throw { status: 401, message: "Wrong security code" }

  next()
}
