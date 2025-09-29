require('dotenv').config()
import { createTransport } from "nodemailer";

const transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER, // Email của bạn
        pass: process.env.EMAIL_PASSWORD, // Mật khẩu hoặc mật khẩu ứng dụng
    },
});

export const sendMailToAcceptRegister = async (email: string) => {
    const mainOptions = {
        from: 'Wallest (ph.hoangloc@gmail.com) <no-reply>',
        to: email,
        subject: 'Active your Account',
        html: `
        <div>
        <p style="text-align:center">Thanks for you registering!<p>
        <p style="text-align:center">active the account!<p>
        <a style="font-weight:bold;color:red;text-align:center;font-family:40px;margin:auto;display:block" href="http://localhost:4000/api/active?email=${email}">CLICK HERE</a>
        </div>`
    }
    await transporter.sendMail(mainOptions)
}