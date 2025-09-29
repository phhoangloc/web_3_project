import { Request, Response } from "express"
import { IUserService } from "../services/IServices"
import { saveCookie } from "../lib/cookie"
import { UserDTO } from "../DTO/user"
import { CreateUserDTO } from "../DTO/user"
import { ResponseDTO } from "../DTO/response"

const iUserService = new IUserService()

export class Controller {

    async findUser(req: Request, res: Response) {
        const query = req.query
        try {
            const result = await iUserService.findAllUser(query)
            const resultDTO = result.map((re: any) => new UserDTO(re))
            const responseDTO = new ResponseDTO(true, resultDTO)
            res.json(responseDTO)
        } catch (error: any) {
            const responseDTO = new ResponseDTO(false, error.massage)
            res.status(400).json(responseDTO)
        }

    }
    async findUserByQuery(req: Request, res: Response) {
        const query = req.query
        try {
            const result: any = await iUserService.findOneUser(query)
            const responseDTO = new ResponseDTO(true, result)
            res.json(responseDTO)
        } catch (error: any) {
            const responseDTO = new ResponseDTO(false, error.massage)
            res.status(400).json(responseDTO)
        }
    }
    async signup(req: Request, res: Response) {
        const body = req.body
        try {
            const newUserValidate = new CreateUserDTO(body)
            const result = await iUserService.signup(newUserValidate)
            const responseDTO = new ResponseDTO(true, result)
            res.json(responseDTO)
        } catch (error: any) {
            const responseDTO = new ResponseDTO(false, error.massage)
            res.status(400).json(responseDTO)
        }
    }
    async active(req: Request, res: Response) {
        const query = req.query
        try {
            await iUserService.active(query)
            const responseDTO = new ResponseDTO(true, "your account is acctive")
            res.json(responseDTO)
        } catch (error: any) {
            const responseDTO = new ResponseDTO(false, error.massage)
            res.status(400).json(responseDTO)
        }
    }
    async login(req: Request, res: Response) {
        const body = req.body
        try {
            const token = await iUserService.login(body)
            if (token) {
                saveCookie(token, res)
                const responseDTO = new ResponseDTO(true, "login success")
                res.json(responseDTO)
            }
        } catch (error: any) {
            const responseDTO = new ResponseDTO(false, error.massage)
            res.json(responseDTO)
        }
    }
    async checkUserExist(req: Request, res: Response) {
        const query = req.query
        if (query == null) {
            try {
                const result: any = await iUserService.findOneUser(query)
                if (result) {
                    res.json(true)
                } else {
                    res.json(false)
                }
            } catch (error: any) {
                res.status(400).json(error.message)
            }
        } else {
            res.json(false)
        }
    }
}
