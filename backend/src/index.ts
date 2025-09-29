import express, { Request, Response } from "express"
import route from "./routes"
import bodyParser from "body-parser"
import cors from "cors"

const app = express()
require('dotenv').config()

const port = process.env.PORT
app.use(bodyParser.json({ limit: '5mb' }));
app.use(cors({
    origin: process.env.ADMIN_URL,
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))
route(app)

app.listen(port, () => {
    console.log("connect server with port " + port)
})