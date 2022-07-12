import { Router } from "express"
import { cardRouter } from "./cardRouter.js"
import { paymentRouter } from "./paymentRouter.js"
import { virtualCardRouter } from "./virtualCardRouter.js"

const Routers = Router()

Routers.use(cardRouter)
Routers.use(paymentRouter)
Routers.use(virtualCardRouter)

export { Routers }
