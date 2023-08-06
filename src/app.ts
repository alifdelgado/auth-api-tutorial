import express from "express";
import morgan from "morgan";
import { dbConnection } from "./utils/database";
import router from "./routes";
import env from "./config/default";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/api", router);

export const main = () => {
  dbConnection();
  app.listen(env.PORT);
};
