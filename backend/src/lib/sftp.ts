require('dotenv').config()

export const sftpConfig = {
    host: "162.43.88.28",
    username: "locpham",
    password: process.env.SFTP_PASSWORD,
    port: 22
};