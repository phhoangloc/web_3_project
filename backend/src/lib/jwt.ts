import { sign } from "jsonwebtoken";

export const generateToken = async (id: number, secret?: string) => {
    const payload = { id };
    if (secret) {
        const token = sign(payload, secret, { expiresIn: '1d' })
        return token
    } else {
        throw new Error("please set the secret password")
    }

};
