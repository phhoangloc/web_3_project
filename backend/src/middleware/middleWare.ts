import { NextFunction, Request, Response } from "express";
import { parse } from "cookie"
import { verify } from "jsonwebtoken"
import { IUserService } from "../services/IServices";

const iUserService = new IUserService()

interface CustomRequest extends Request {
    id?: number;
}
export class Middlewares {

    position;

    constructor(position: string) {
        this.position = position;
        this.checkPosition = this.checkPosition.bind(this);
    }


    async checkPosition(req: CustomRequest, res: Response, next: NextFunction) {
        const cookies = req.headers.cookie;
        const token = cookies ? parse(cookies).token : null;
        try {
            if (!token) {
                throw new Error("you haven't logged in yet")
            }
            if (!process.env.SECRETTOKEN) {
                throw new Error("you haven't logged in yet")
            }
            const result = verify(token, process.env.SECRETTOKEN)
            if (typeof result !== 'object' || !result.id) {
                throw new Error("your token is expired")
            }
            const user = await iUserService.findOneUser({ id: result.id })
            if (!user) {
                throw new Error("id is not Existed")
            }
            if (user.position !== this.position && user.position !== "admin") {
                throw new Error("you don't have permission")
            }
            req.id = result.id
            next()
        } catch (error: any) {
            res.json(error.message)
        }
    }

}