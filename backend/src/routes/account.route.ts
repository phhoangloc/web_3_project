import { Request, Response, Router } from "express";
import { UserController } from "../controller/user.controller";
const userController = new UserController()
interface CustomRequest extends Request {
    id?: number,
    mnemonic?: any
}
export const AccountRoutes = Router()

AccountRoutes.post("/", userController.getAccountFromUser)
AccountRoutes.post("/transfer", userController.transfer)
