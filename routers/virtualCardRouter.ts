import { Router } from "express"
import {
  createVirtualCard,
  deleteVirtualCard,
} from "../controllers/virtualCardController.js"
import { card } from "../middlewares/cardMiddleware.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { deleteVirtualCardschema } from "../schemas/deleteVirtualCardschema.js"
import { newVirtualCardSchema } from "../schemas/newVirtualCardschema.js"

const virtualCardRouter = Router()

virtualCardRouter.post(
  "/virtual-cards",
  validateSchema(newVirtualCardSchema),
  card.getAndPassToLocals,
  card.ensureExistance,
  card.validatePassword,
  createVirtualCard,
)

// TODO this schema is equal to the newVirtualCardSchema
virtualCardRouter.delete(
  "/virtual-cards",
  validateSchema(deleteVirtualCardschema),
  card.getAndPassToLocals,
  card.ensureExistance,
  card.ensureIsVirtual,
  card.ensureIsActivated,
  card.validatePassword,
  deleteVirtualCard,
)

export { virtualCardRouter }
