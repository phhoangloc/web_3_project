import { Request, Response, Router } from "express";
import { Controller } from "../controller";
import { MnenomicController } from "../controller/mnenomic.controller";
import { UserController } from "../controller/user.controller";
export const AdminRoutes = Router()
const controller = new Controller()
const userController = new UserController()
const mnenomicController = new MnenomicController()


AdminRoutes.get("/", controller.findUser)
AdminRoutes.post("/mnemonicAuth", mnenomicController.getMnenomic)
AdminRoutes.post("/mnenomic", mnenomicController.createMnenomic)
AdminRoutes.post("/logout", userController.logout)

