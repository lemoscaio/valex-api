import { Router } from "express"

import {
  createCard,
  getCardBalanceAndStatements,
  getEmployeeCards,
  setCardPassword,
} from "../controllers/cardController.js"
import { authenticateApiKey } from "../middlewares/authMiddleware.js"
import { ensureCardExists } from "../middlewares/ensureCardExists.js"
import { ensureCardIsNotActivated } from "../middlewares/ensureCardIsNotActivated.js"
import { ensureCardIsNotExpired } from "../middlewares/ensureCardIsNotExpired.js"
import { ensureEmployeeExists } from "../middlewares/ensureEmployeeExists.js"
import { ensureEmployeeHasUniqueType } from "../middlewares/ensureEmployeeHasUniqueType.js"
import { validateCardSecurityCode } from "../middlewares/validateCardSecurityCode.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { activateCardSchema } from "../schemas/activateCardSchema.js"
import { newCardSchema } from "../schemas/newCardSchema.js"

const cardRouter = Router()

cardRouter.post(
  "/cards",
  validateSchema(newCardSchema),
  authenticateApiKey,
  ensureEmployeeExists,
  ensureEmployeeHasUniqueType,
  createCard,
)
cardRouter.post(
  "/activate-card",
  validateSchema(activateCardSchema),
  ensureCardExists,
  ensureCardIsNotExpired,
  validateCardSecurityCode,
  ensureCardIsNotActivated,
  setCardPassword,
)
cardRouter.get("/cards", getEmployeeCards)

cardRouter.get(
  "/card-statements?:cardId",
  ensureCardExists,
  getCardBalanceAndStatements,
)

export { cardRouter }
