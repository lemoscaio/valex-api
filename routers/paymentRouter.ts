import { Router } from "express"

import { insertPayment } from "../controllers/paymentController.js"
import { card } from "../middlewares/cardMiddleware.js"
import { business } from "../middlewares/businessMiddleware.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import {
  onlinePaymentSchema,
  paymentSchema,
} from "../schemas/paymentSchemas.js"

const paymentRouter = Router()

paymentRouter.post(
  "/payment",
  validateSchema(paymentSchema),
  card.getAndPassToLocals,
  card.ensureExistance,
  card.ensureIsNotVirtual,
  card.ensureIsActivated,
  card.ensureIsNotExpired,
  card.ensureIsNotBlocked,
  card.validatePassword,
  business.getAndPassToLocals,
  business.ensureExistance,
  business.ensureMatchesCardType,
  insertPayment,
)

paymentRouter.post(
  "/online-payment",
  validateSchema(onlinePaymentSchema),
  card.getAndPassToLocals,
  card.ensureExistance,
  card.validateSecurityCode,
  card.ensureIsNotExpired,
  card.ensureIsNotBlocked,
  business.getAndPassToLocals,
  business.ensureExistance,
  business.ensureMatchesCardType,
  insertPayment,
)

export { paymentRouter }
