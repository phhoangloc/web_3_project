import { Request, Response, Router } from "express";
import { Controller } from "../controller";
const controller = new Controller()
export const APIRoutes = Router()

APIRoutes.post("/login", controller.login)
APIRoutes.post("/signup", controller.signup)
APIRoutes.get("/checkuser", controller.checkUserExist)
APIRoutes.get("/active", controller.active)
APIRoutes.get("/", (req: Request, res: Response) => {
    res.json("route api")
})