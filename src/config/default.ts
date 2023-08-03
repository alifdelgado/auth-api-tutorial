import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
export const LOG_LEVEL = process.env.LOG_LEVEL;
export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PORT = +process.env.SMTP_PORT!;
export const SMTP_SECURE = !process.env.SMTP_SECURE;
