import express from "express";
import morgan from "morgan";
import { PORT } from "./config/default";
import { dbConnection } from "./utils/database";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

export const main = () => {
  dbConnection();
  app.listen(PORT);
};
