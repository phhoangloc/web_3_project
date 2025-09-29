import crypto from "crypto"
type Decrypt = {
    ciphertext: string,
    iv: string,
    salt: string
}
export const encrypt = (text: string, password: string) => {
    const salt = crypto.randomBytes(16);
    const key = crypto.scryptSync(password, salt, 32); // derive key từ password
    const iv = crypto.randomBytes(16); // initialization vector
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
    return {
        ciphertext: encrypted.toString("hex"),
        iv: iv.toString("hex"),
        salt: salt.toString("hex"),
    };
}

export const decrypt = ({ ciphertext, iv, salt }: Decrypt, password: string) => {
    const key = crypto.scryptSync(password, Buffer.from(salt, "hex"), 32);
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, Buffer.from(iv, "hex"));
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(ciphertext, "hex")),
        decipher.final(),
    ]);
    return decrypted.toString("utf8");
}