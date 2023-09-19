import express from "express";
import authRouter from "./authRouter.js";
import htxRouter from "./htxRouter.js";
import commonRouter from "./commonRouter.js";
import dnRouter from "./dnRouter.js";
import qtvRouter from "./qtvRouter.js";
import qtvbdRouter from "./qtvbdRouter.js";
import qltcRouter from "./qltcRouter.js";
const apiRoute = express();

apiRoute.use("/auth", authRouter);
apiRoute.use("/htx", htxRouter);
apiRoute.use("/dn", dnRouter);
apiRoute.use("/common", commonRouter);
apiRoute.use("/qtv", qtvRouter);
apiRoute.use("/qtvbd", qtvbdRouter);
apiRoute.use("/qltc", qltcRouter);
export default apiRoute;
