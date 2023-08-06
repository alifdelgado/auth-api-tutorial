import nodemailer, { SendMailOptions } from "nodemailer";
import { log } from "./logger";
import env from "../config/default";

const createTestCreds = async () => {
  const creds = await nodemailer.createTestAccount();
  console.log(creds);
};

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
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
