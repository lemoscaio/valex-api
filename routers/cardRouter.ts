import { Router } from "express"

import { createCard } from "../controllers/cardController.js"
import { authenticateApiKey } from "../middlewares/authMiddleware.js"
import { ensureEmployeeExists } from "../middlewares/ensureEmployeeExists.js"
import { ensureEmployeeHasUniqueType } from "../middlewares/ensureEmployeeHasUniqueType.js"
import { validateSchema } from "../middlewares/validateSchema.js"
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

export { cardRouter }
