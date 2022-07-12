import { Router } from "express"

import { insertPayment } from "../controllers/paymentController.js"
import { checkIfBusinessMatchCardType } from "../middlewares/checkIfBusinessMatchCardType.js"
import { ensureBusinessExists } from "../middlewares/ensureBusinessExists.js"
import { ensureCardExists } from "../middlewares/ensureCardExists.js"
import { ensureCardExistsFromNumber } from "../middlewares/ensureCardExistsFromNumber.js"
import { ensureCardIsActivated } from "../middlewares/ensureCardIsActivated.js"
import { ensureCardIsNotBlocked } from "../middlewares/ensureCardIsNotBlocked.js"
import { ensureCardIsNotExpired } from "../middlewares/ensureCardIsNotExpired.js"
import { ensureCardIsNotVirtual } from "../middlewares/ensureCardIsNotVirtual.js"
import { validateCardPassword } from "../middlewares/validateCardPassword.js"
import { validateCardSecurityCode } from "../middlewares/validateCardSecurityCode.js"
import { validateOnlinePaymentCardData } from "../middlewares/validateOnlinePaymentCardData.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import {
  onlinePaymentSchema,
  paymentSchema,
} from "../schemas/paymentSchemas.js"

const paymentRouter = Router()

paymentRouter.post(
  "/payment",
  validateSchema(paymentSchema),
  ensureCardExists,
  ensureCardIsNotVirtual,
  ensureCardIsActivated,
  ensureCardIsNotExpired,
  ensureCardIsNotBlocked,
  validateCardPassword,
  ensureBusinessExists,
  checkIfBusinessMatchCardType,
  insertPayment,
)

paymentRouter.post(
  "/online-payment",
  validateSchema(onlinePaymentSchema),
  ensureCardExistsFromNumber,
  validateCardSecurityCode,
  ensureCardIsNotExpired,
  ensureCardIsNotBlocked,
  ensureBusinessExists,
  checkIfBusinessMatchCardType,
  insertPayment,
)

export { paymentRouter }
