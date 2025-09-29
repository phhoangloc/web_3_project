import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export class MnemonicRepository {

    async findMnemonic(body: any) {
        try {
            const result = await prisma.mnemonic.findFirst({
                where: {
                    user: {
                        id: body.userId
                    }
                },
                select: {
                    mnemonic: true,
                    password: true
                },

            })
            return result
        } catch (error) {
            throw error
        }
    }
    async createMnemonic(body: any) {
        try {
            const result = await prisma.mnemonic.create({ data: body })
            return result
        } catch (error) {
            return error
        }

    }
    async updateMnemonic(body: any, id: number) {
        try {
            const result = await prisma.mnemonic.update({ where: { id }, data: body })
            return result
        } catch (error) {
            return error

        }
    }
    async deleteMnemonic(id: number) {
        try {
            const result = await prisma.mnemonic.delete({ where: { id } })
            return result
        } catch (error) {
            return error
        }

    }
}