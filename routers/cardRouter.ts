import { Router } from "express"

import {
  blockCard,
  createCard,
  getCardBalanceAndStatements,
  getEmployeeCards,
  setCardPassword,
  unblockCard,
} from "../controllers/cardController.js"
import { authenticateApiKey } from "../middlewares/authMiddleware.js"
import { ensureCardExists } from "../middlewares/ensureCardExists.js"
import { ensureCardIsBlocked } from "../middlewares/ensureCardIsBlocked.js"
import { ensureCardIsNotActivated } from "../middlewares/ensureCardIsNotActivated.js"
import { ensureCardIsNotBlocked } from "../middlewares/ensureCardIsNotBlocked.js"
import { ensureCardIsNotExpired } from "../middlewares/ensureCardIsNotExpired.js"
import { ensureEmployeeExists } from "../middlewares/ensureEmployeeExists.js"
import { ensureEmployeeHasUniqueType } from "../middlewares/ensureEmployeeHasUniqueType.js"
import { validateCardPassword } from "../middlewares/validateCardPassword.js"
import { validateCardSecurityCode } from "../middlewares/validateCardSecurityCode.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { activateCardSchema } from "../schemas/activateCardSchema.js"
import { blockCardSchema } from "../schemas/blockCardSchema.js"
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

cardRouter.put(
  "/cards/block",
  validateSchema(blockCardSchema),
  ensureCardExists,
  validateCardPassword,
  ensureCardIsNotExpired,
  ensureCardIsNotBlocked,
  blockCard,
)
// TODO: resolve redudancy when finishing the feature (to avoid early optimization)
cardRouter.put(
  "/cards/unblock",
  validateSchema(blockCardSchema),
  ensureCardExists,
  validateCardPassword,
  ensureCardIsNotExpired,
  ensureCardIsBlocked,
  unblockCard,
)

export { cardRouter }
