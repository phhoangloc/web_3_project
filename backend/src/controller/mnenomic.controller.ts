import { compare } from "bcryptjs"
import { decrypt, encrypt } from "../lib/crypto"
import { IMnemonicService } from "../services/IServices"
import { Request, Response } from "express"
import { ResponseDTO } from "../DTO/response"
import { ethers } from "ethers"
const iService = new IMnemonicService()
interface CustomRequest extends Request {
    id?: number
}
export class MnenomicController {
    async getMnenomic(req: CustomRequest, res: Response) {
        const body = req.body
        if (req.id) {
            body.userId = req.id
            try {
                const result = await iService.getMnemonic(body)
                if (result === null) { return res.json(new ResponseDTO(false, "no mnomonic")) }
                const mnenomic = result.mnemonic
                const password = result.password
                const isValid = await compare(body.password, password);
                if (!isValid) { return res.json(new ResponseDTO(false, "password is not correct")) }
                const mnenomicDecrypt = decrypt(JSON.parse(mnenomic), body.password)
                res.json(new ResponseDTO(true, mnenomicDecrypt))

            } catch (error: any) {
                res.json(new ResponseDTO(false, error.message))
            }
        } else {
            res.json(new ResponseDTO(true, "you dont have permission"))

        }
    }
    async createMnenomic(req: CustomRequest, res: Response) {
        const body = req.body
        const id = req.id
        if (id) {
            try {
                const wallet = ethers.Wallet.createRandom();
                const newMnemonic = wallet.mnemonic
                const newBody = {
                    mnemonic: newMnemonic?.phrase,
                    password: body.password
                }
                await iService.createMnemonic(newBody, id)
                res.json({
                    success: true,
                    msg: "you have been create a mnenomic"
                })
            } catch (error: any) {
                res.json(error.message)
            }
        } else {
            res.json("you dont have permission")

        }
    }
}