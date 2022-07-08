import { Router } from "express"
import { cardRouter } from "./cardRouter.js"
import { paymentRouter } from "./paymentRouter.js"

const Routers = Router()

Routers.use(cardRouter)
Routers.use(paymentRouter)

export { Routers }
