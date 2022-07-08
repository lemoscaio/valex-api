import { Request, Response, NextFunction } from "express"

import * as businessRepository from "../repositories/businessRepository.js"

export async function ensureBusinessExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const businessId: number = req.body.businessId

  const business = await businessRepository.findById(businessId)
  console.log("🚀 ~ business", business)

  if (!business) {
    throw { status: 404, message: "Business not registered" }
  }

  res.locals.business = business

  next()
}
