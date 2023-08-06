import { config } from "dotenv";
import { bool, cleanEnv, num, str } from "envalid";
config();

const env = cleanEnv(process.env, {
  PORT: num(),
  MONGO_URI: str(),
  LOG_LEVEL: str(),
  SMTP_USER: str(),
  SMTP_PASSWORD: str(),
  SMTP_HOST: str(),
  SMTP_PORT: num(),
  SMTP_SECURE: bool(),
  ACCESS_TOKEN_PRIVATE_KEY: str(),
  REFRESH_TOKEN_PRIVATE_KEY: str(),
  ACCESS_TOKEN_PUBLIC_KEY: str(),
  REFRESH_TOKEN_PUBLIC_KEY: str(),
});

export default env;
