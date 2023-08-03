import nodemailer, { SendMailOptions } from "nodemailer";
import {
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
} from "../config/default";
import { log } from "./logger";

const createTestCreds = async () => {
  const creds = await nodemailer.createTestAccount();
  console.log(creds);
};

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

export const sendEmail = async (payload: SendMailOptions) => {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      return log.error(err, "Error sending email");
    }

    log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
  });
};
