import { Router } from "express"
import { cardRouter } from "./cardRouter.js"

const Routers = Router()

Routers.use(cardRouter)

export { Routers }
