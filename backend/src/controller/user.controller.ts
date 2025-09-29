import { ResponseDTO } from "../DTO/response"
import { UserDTO } from "../DTO/user"
import { decrypt, encrypt } from "../lib/crypto"
import { IMnemonicService, IUserService } from "../services/IServices"
import { NextFunction, Request, Response } from "express"
import { ethers, Mnemonic } from "ethers"
import { compare } from "bcryptjs"
const iService = new IMnemonicService()
const iUser = new IUserService()
interface CustomRequest extends Request {
    id?: number,
    mnemonic?: any
}
export class UserController {
    async findUserById(req: CustomRequest, res: Response) {
        const id = req.id
        try {
            const result: any = await iUser.findOneUser({ id })
            const resultDTO = new UserDTO(result)
            const responseDTO = new ResponseDTO(true, resultDTO)
            res.json(responseDTO)
        } catch (error: any) {
            const responseDTO = new ResponseDTO(false, error.massage)
            res.status(400).json(responseDTO)
        }
    }
    async logout(req: Request, res: Response) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true, // nếu bạn dùng HTTPS
            sameSite: 'strict' // hoặc 'lax' tùy theo setup
        });
        const responseDTO = new ResponseDTO(true, "logout success")

        res.json(responseDTO);
    }

    async getAccountFromUser(req: CustomRequest, res: Response, next: NextFunction) {
        const mnemonic = req.mnemonic
        const body = req.body
        const index = body.index || 1
        const wallet = ethers.HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(mnemonic), "m/44'/60'/0'/0/" + index);
        const provider = new ethers.JsonRpcProvider(body.rpc_url)
        try {
            const currentwallet = wallet.connect(provider);
            const address = currentwallet.address
            const privateKey = currentwallet.privateKey
            const balance = await provider.getBalance(address);
            res.json(new ResponseDTO(true, { address, balance: Number(balance), privateKey }))
        } catch (error) {
            res.json(new ResponseDTO(false, "blockchain network is not correct"))
            provider.destroy()
        }

    }
    async transfer(req: CustomRequest, res: Response, next: NextFunction) {
        const mnemonic = req.mnemonic
        const body = req.body
        const index = body.index || 1
        const wallet = ethers.HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(mnemonic), "m/44'/60'/0'/0/" + index);
        const provider = new ethers.JsonRpcProvider(body.rpc_url)
        try {
            const currentwallet = wallet.connect(provider);
            const tx = await currentwallet.sendTransaction({
                to: body.address,
                value: ethers.parseEther(body.value.toString(),),
            });
            await tx.wait();
            res.json(new ResponseDTO(true, { msg: "you have transfered successfully", to: body.address, amount: body.value }))

        } catch (error) {
            res.json(new ResponseDTO(false, "blockchain network is not correct"))
            provider.destroy()
        }

    }
}