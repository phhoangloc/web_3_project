import { genSaltSync, hashSync } from "bcryptjs"
import { encrypt } from "../lib/crypto"
import { IMnemonicRepository } from "../repository/IRepository"

const iRepository = new IMnemonicRepository()
export class MnemonicService {

    async getMnemonic(body: any) {
        try {
            const result = await iRepository.findMnemonic(body)
            return result
        } catch (error: any) {
            throw error
        }
    }

    async createMnemonic(body: any, id: number) {
        const newBody = body
        newBody.user = {
            connect: { id: id }
        }
        const mnemonic = encrypt(body.mnemonic, body.password)
        newBody.mnemonic = JSON.stringify(mnemonic)

        const salt = genSaltSync(10);
        const mahoa_password = body.password && hashSync(body.password.toString(), salt);
        newBody.password = mahoa_password
        try {
            const result = await iRepository.createMnemonic(newBody)
            return result
        } catch (error: any) {
            throw error
        }
    }
}