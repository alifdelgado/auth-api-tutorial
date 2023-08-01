import { connect } from "mongoose";
import { MONGO_URI } from "../config/default";
import { log } from "./logger";

export const dbConnection = async () => {
  try {
    await connect(MONGO_URI!);
    log.info("Connected to DB");
  } catch (e) {
    console.log("Error: ", e);
    process.exit(1);
  }
};
