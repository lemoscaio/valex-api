import { Router } from "express"

import { insertPayment } from "../controllers/paymentController.js"
import { checkIfBusinessMatchCardType } from "../middlewares/checkIfBusinessMatchCardType.js"
import { ensureBusinessExists } from "../middlewares/ensureBusinessExists.js"
import { ensureCardExists } from "../middlewares/ensureCardExists.js"
import { ensureCardIsActivated } from "../middlewares/ensureCardIsActivated.js"
import { ensureCardIsNotBlocked } from "../middlewares/ensureCardIsNotBlocked.js"
import { ensureCardIsNotExpired } from "../middlewares/ensureCardIsNotExpired.js"
import { validateCardPassword } from "../middlewares/validateCardPassword.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { paymentSchema } from "../schemas/paymentSchema.js"

const paymentRouter = Router()

paymentRouter.post(
  "/payment",
  validateSchema(paymentSchema),
  ensureCardExists,
  ensureCardIsActivated,
  ensureCardIsNotExpired,
  ensureCardIsNotBlocked,
  validateCardPassword,
  ensureBusinessExists,
  checkIfBusinessMatchCardType,
  insertPayment,
)

export { paymentRouter }
