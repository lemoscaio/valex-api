import { Router } from "express"

import {
  blockCard,
  createCard,
  getCardBalanceAndStatements,
  rechargeCard,
  setCardPassword,
  unblockCard,
} from "../controllers/cardController.js"
import { authenticateApiKey } from "../middlewares/authMiddleware.js"
import { card } from "../middlewares/cardMiddleware.js"
import { employee } from "../middlewares/employeeMiddleware.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { activateCardSchema } from "../schemas/activateCardSchema.js"
import { blockCardSchema } from "../schemas/blockCardSchema.js"
import { newCardSchema } from "../schemas/newCardSchema.js"
import { rechargeSchema } from "../schemas/rechargeSchema.js"

const cardRouter = Router()

cardRouter.post(
  "/cards",
  validateSchema(newCardSchema),
  authenticateApiKey,
  employee.getAndPassToLocals,
  employee.ensureExistance,
  employee.ensureHasUniqueCardType,
  createCard,
)

cardRouter.post(
  "/activate-card",
  validateSchema(activateCardSchema),
  card.getAndPassToLocals,
  card.ensureExistance,
  card.ensureIsNotExpired,
  card.validateSecurityCode,
  card.ensureIsNotActivated,
  setCardPassword,
)

cardRouter.get(
  "/card-statements?:cardId",
  card.getAndPassToLocals,
  card.ensureExistance,
  getCardBalanceAndStatements,
)

cardRouter.put(
  "/cards/block",
  validateSchema(blockCardSchema),
  card.getAndPassToLocals,
  card.ensureExistance,
  card.ensureIsActivated,
  card.validatePassword,
  card.ensureIsNotExpired,
  card.ensureIsNotBlocked,
  blockCard,
)
// TODO: resolve redudancy in ensureCardIsBlocked
cardRouter.put(
  "/cards/unblock",
  validateSchema(blockCardSchema),
  card.getAndPassToLocals,
  card.ensureExistance,
  card.ensureIsActivated,
  card.validatePassword,
  card.ensureIsNotExpired,
  card.ensureIsBlocked,
  unblockCard,
)
// TODO: resolve redudancy in ensureCardIsActivated
cardRouter.post(
  "/cards/recharge",
  validateSchema(rechargeSchema),
  card.getAndPassToLocals,
  card.ensureExistance,
  card.ensureIsNotVirtual,
  card.ensureIsActivated,
  card.ensureIsNotExpired,
  rechargeCard,
)

export { cardRouter }
