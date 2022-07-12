import { Router } from "express"
import {
  createVirtualCard,
  deleteVirtualCard,
} from "../controllers/virtualCardController.js"
import { ensureCardExists } from "../middlewares/ensureCardExists.js"
import { ensureCardIsActivated } from "../middlewares/ensureCardIsActivated.js"
import { ensureCardIsVirtual } from "../middlewares/ensureCardIsVirtual.js"
import { validateCardPassword } from "../middlewares/validateCardPassword.js"
import { validateSchema } from "../middlewares/validateSchema.js"
import { deleteVirtualCardschema } from "../schemas/deleteVirtualCardschema.js"
import { newVirtualCardSchema } from "../schemas/newVirtualCardschema.js"

const virtualCardRouter = Router()

virtualCardRouter.post(
  "/virtual-cards",
  validateSchema(newVirtualCardSchema),
  ensureCardExists,
  ensureCardIsActivated,
  validateCardPassword,
  createVirtualCard,
)

// TODO this schema is equal to the newVirtualCardSchema
virtualCardRouter.delete(
  "/virtual-cards",
  validateSchema(deleteVirtualCardschema),
  ensureCardExists,
  ensureCardIsVirtual,
  ensureCardIsActivated,
  validateCardPassword,
  deleteVirtualCard,
)

export { virtualCardRouter }
