import express from "express";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import apiRouter from "./src/routes/router.js";
dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", apiRouter);

app.listen(port, () => {
    console.log("App listening in port: ", port);
});
