import dayjs from "dayjs";
import logger from "pino";
import { LOG_LEVEL } from "../config/default";

export const log = logger({
  transport: {
    target: "pino-pretty",
  },
  LOG_LEVEL,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});
