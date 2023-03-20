import express from "express";
import authRouter from "./authRouter.js";
import htxRouter from "./htxRouter.js";
import commonRouter from "./commonRouter.js";
import dnRouter from "./dnRouter.js";
const apiRoute = express();

apiRoute.use("/auth", authRouter);
apiRoute.use("/htx", htxRouter);
apiRoute.use("/dn", dnRouter);
apiRoute.use("/common", commonRouter);
export default apiRoute;
