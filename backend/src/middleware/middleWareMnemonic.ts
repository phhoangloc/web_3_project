import { NextFunction, Request, Response } from "express";
import { IMnemonicService, IUserService } from "../services/IServices";
import { ResponseDTO } from "../DTO/response";
import { UserDTO } from "../DTO/user";
import { compare } from "bcryptjs";
import { decrypt } from "../lib/crypto";
import { ethers } from "ethers";

const iUserService = new IUserService()
const iService = new IMnemonicService()

interface CustomRequest extends Request {
    id?: number;
    mnemonic?: string;
}
export class MiddlewareMnemonic {

    async checkMnemonic(req: CustomRequest, res: Response, next: NextFunction) {
        const id = req.id
        let body = req.body
        if (!body || !body.password) {
            const responseDTO = new ResponseDTO(false, "please input password")
            res.json(responseDTO)
            return
        }
        if (!id) {
            return
        }
        if (!body.rpc_url) {
            res.json(new ResponseDTO(false, "no blockchain network"))
            return
        }

        try {
            const result: any = await iUserService.findOneUser({ id })
            const resultDTO = new UserDTO(result)
            const mnemonic = resultDTO.mnemonic
            if (mnemonic) {
                const isValid = await compare(body.password, mnemonic.password);
                if (!isValid) { return res.json(new ResponseDTO(false, "password is not correct")) }
                const mnemonicDecrypt = decrypt(JSON.parse(mnemonic.mnemonic), body.password)
                req.mnemonic = mnemonicDecrypt
                next()
            } else {
                const responseDTO = new ResponseDTO(false, "you dont have any wallet")
                res.json(responseDTO)
            }
        } catch (error: any) {
            const responseDTO = new ResponseDTO(false, error.massage)
            res.json(responseDTO)
        }
    }

}