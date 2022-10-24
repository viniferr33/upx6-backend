import express, { json } from "express";
import cors from "cors";
import router from "./routes";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(json());
app.use(router);

export default app;
