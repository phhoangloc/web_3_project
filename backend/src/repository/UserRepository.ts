import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export class UserRepository {

    async findUser(query: any) {
        try {
            const result = await prisma.user.findMany({
                where: {
                    id: query.id ? Number(query.id) : undefined,
                    username: query.username ? query.username : undefined,
                    email: query.email ? query.email : undefined
                },
                include: {
                    mnemonic: true
                }
            })
            return result
        } catch (error) {
            throw error
        }
    }
    async createUser(body: any) {
        try {
            const result = await prisma.user.create({ data: body })
            return result
        } catch (error) {
            throw error
        }
    }
    async updateUser(id: number, body: any) {
        try {
            const result = await prisma.user.update({ where: { id }, data: body })
            return result
        } catch (error) {
            throw error
        }
    }
    async deleteUser(id: number, body: any) {
        try {
            const result = await prisma.user.delete({ where: { id } })
            return result
        } catch (error) {
            throw error
        }
    }
}