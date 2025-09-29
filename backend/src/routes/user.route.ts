import { Router } from "express";
import { UserController } from "../controller/user.controller";
import { MnenomicController } from "../controller/mnenomic.controller";
import { AccountRoutes } from "./account.route";
import { MiddlewareMnemonic } from "../middleware/middleWareMnemonic";
const userController = new UserController()
const mnenomicController = new MnenomicController()
const middlewareMnemonic = new MiddlewareMnemonic()

export const UserRoutes = Router()
UserRoutes.get("/", userController.findUserById)
// UserRoutes.post("/mnemonicAuth", mnenomicController.getMnenomic)
UserRoutes.post("/createWallet", mnenomicController.createMnenomic)
UserRoutes.post("/logout", userController.logout)

UserRoutes.use("/account", middlewareMnemonic.checkMnemonic, AccountRoutes)

