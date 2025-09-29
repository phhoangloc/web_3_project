import { ResponseDTO } from "../DTO/response"
import { decrypt, encrypt } from "../lib/crypto"
import { IMnemonicService, IUserService } from "../services/IServices"
import { Request, Response } from "express"
const iService = new IMnemonicService()
const iUser = new IUserService()
interface CustomRequest extends Request {
    id?: number
}
export class AdminController {

    async logout(req: Request, res: Response) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true, // nếu bạn dùng HTTPS
            sameSite: 'strict' // hoặc 'lax' tùy theo setup
        });
        const responseDTO = new ResponseDTO(true, "logout success")

        res.json(responseDTO);
    }
}