// import { User } from "../entity/user";
import { IUserRepository } from "../repository/IRepository";
import { generateToken } from "../lib/jwt";
import { sendMailToAcceptRegister } from "../lib/mail";
import { genSaltSync, hashSync } from "bcryptjs";
import { compare } from "bcryptjs";
import { encrypt } from "../lib/crypto";

const iUserRepository = new IUserRepository()
export class UserService {

    async findAllUser(query: any) {
        try {
            const result = await iUserRepository.findUser(query)
            return result
        } catch (error) {
            throw error
        }
    }
    async findUserByQuery(query: any) {
        try {
            const result = await iUserRepository.findUser(query)
            return result
        } catch (error) {
            throw error
        }
    }
    async findOneUser(query: any) {
        try {
            const result = await iUserRepository.findUser(query)
            return result[0]
        } catch (error) {
            throw error
        }
    }
    async signup(body: any) {
        const userByUsername = await iUserRepository.findUser({ username: body.username })
        const isUsernameExist = userByUsername[0]
        if (isUsernameExist) {
            throw new Error("username is exited")
        }
        const userByEmail = await iUserRepository.findUser({ email: body.email })
        const isEmailExist = userByEmail[0]
        if (isEmailExist) {
            throw new Error("email is exited")
        }
        const salt = genSaltSync(10);

        const mahoa_password = body.password && hashSync(body.password.toString(), salt);
        body.password = mahoa_password
        try {
            await iUserRepository.createUser(body)
            await sendMailToAcceptRegister(body.email)
            return "check your email to active account!"
        } catch (error) {
            throw error
        }
    }
    async active(query: any) {
        try {
            const users = await iUserRepository.findUser({ email: query.email })
            const user = users[0]
            if (user) {
                const id = user.id
                try {
                    const result = await iUserRepository.updateUser(id, { active: true })
                    return result
                } catch (error) {
                    throw error
                }
            }
        } catch (error) {
            throw error
        }


    }
    async login(body: any) {
        const users = await iUserRepository.findUser({ username: body.username })
        const user = users[0]
        if (!user) {
            throw new Error("username is not correct")
        }
        if (!user.active) {
            throw new Error("your account is not active")
        }

        const isValid = await compare(body.password, user.password);
        if (!isValid) {
            throw new Error("password is not correct")
        }

        try {
            const isToken = await generateToken(user.id, process.env.SECRETTOKEN)
            const token = isToken ? isToken : ""
            return token
        } catch (error) {
            throw error
        }


    }
    async createUser(body: any) {
        const usersByUsername = await iUserRepository.findUser({ username: body.username })
        const isUsernameExist = usersByUsername[0]
        if (isUsernameExist) {
            throw new Error("username is exited")
        }
        const usersByEmail = await iUserRepository.findUser({ email: body.email })
        const isEmailExist = usersByEmail[0]
        if (isEmailExist) {
            throw new Error("email is exited")
        }
        const salt = genSaltSync(10);

        const mahoa_password = body.password && hashSync(body.password.toString(), salt);
        body.password = mahoa_password
        try {
            // const newUser = new User(body)
            await iUserRepository.createUser(body)
            return true
        } catch (error) {
            throw error
        }
    }
    async updateUser(id: number, body: any) {
        try {
            await iUserRepository.updateUser(id, body)
            return true
        } catch (error) {
            throw error
        }

    }
}
