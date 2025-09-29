import { Express, Request, Response } from "express";
import { Middlewares } from "../middleware/middleWare";
import { UserRoutes } from "./user.route";
import { AdminRoutes } from "./admin.route";
import { APIRoutes } from "./api.route";
const userMiddlwear = new Middlewares("user")
const adminMiddlwear = new Middlewares("admin")
const route = (app: Express) => {
    app.use("/api/user", userMiddlwear.checkPosition, UserRoutes)
    app.use("/api/admin", adminMiddlwear.checkPosition, AdminRoutes)
    app.use("/api", APIRoutes)
}

export default route