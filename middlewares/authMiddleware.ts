import { Request, Response, NextFunction } from "express"

import * as companyRepository from "../repositories/companyRepository.js"

export async function authenticateApiKey(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const apiKey: string = req.header("x-api-key")

  const company = await companyRepository.findByApiKey(apiKey)

  if (!company) {
    throw { status: 401, message: "Wrong API Key" }
  }

  delete company.apiKey

  res.locals.company = company

  next()
}
