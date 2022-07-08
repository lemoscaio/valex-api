import { Request, Response, NextFunction } from "express"

import * as employeeRepository from "../repositories/employeeRepository.js"

export async function ensureEmployeeExists(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { employeeId }: { employeeId: number } = req.body

  const employee = await employeeRepository.findById(employeeId)
  console.log("🚀 ~ employee", employee)

  if (!employee) {
    throw { status: 404, message: "Employee doesn't exist" }
  }

  res.locals.employee = employee

  next()
}
