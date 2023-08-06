import { connect } from "mongoose";
import { log } from "./logger";
import env from "../config/default";

export const dbConnection = async () => {
  try {
    await connect(env.MONGO_URI);
    log.info("Connected to DB");
  } catch (e) {
    console.log("Error: ", e);
    process.exit(1);
  }
};
