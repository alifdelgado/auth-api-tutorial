import { connect } from "mongoose";
import { MONGO_URI } from "../config/default";

export const dbConnection = async () => {
  try {
    await connect(MONGO_URI!);
  } catch (e) {
    console.log("Error: ", e);
    process.exit(1);
  }
};
