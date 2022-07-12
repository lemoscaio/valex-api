import { NextFunction, Request, Response } from "express"

export function handleError(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(error)

  if (error.status && error.message)
    return res.status(error.status).send(error.message)
  if (error.details)
    return res.status(422).send(error.details.map(({ message }) => message))

  res.status(500)
}
