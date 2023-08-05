import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import {
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyUserInput,
} from "../schemas/user.schema";
import {
  createUser,
  findUserByEmail,
  findUserById,
} from "../services/user.service";
import { log } from "../utils/logger";
import { sendEmail } from "../utils/mailer";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  const body = req.body;

  try {
    const user = await createUser(body);
    await sendEmail({
      from: "test@admin.com",
      to: user.email,
      subject: "Please verify your email",
      text: `verificarion code ${user.verificationCode}. Id: ${user._id}`,
    });
    return res.status(201).json({ message: "User created successfully" });
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).json({ message: "User already exists" });
    }
    return res.status(500).json({ message: "Error creating user" });
  }
};

export const verifyUserHandler = async (
  req: Request<VerifyUserInput>,
  res: Response
) => {
  const { id, verficationCode } = req.params;
  const user = await findUserById(id);

  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.verified)
    return res.status(401).json({ message: "User already verified" });

  if (user.verificationCode !== verficationCode)
    return res.status(401).json({ message: "Invalid verification code" });

  user.verified = true;
  await user.save();
  return res.status(200).json({ message: "User verified successfully" });
};

export const forgotPasswordHandler = async (
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) => {
  const { email } = req.body;
  const user = await findUserByEmail(email);

  if (!user) {
    log.debug(`User with email ${email} not found`);
    return res.status(404).json({ message: "User not found" });
  }

  if (!user.verified)
    return res.status(401).json({ message: "User not verified" });

  const passwordResetCode = uuid();

  user.passwordResetCode = passwordResetCode;

  await user.save();

  await sendEmail({
    to: user.email,
    from: "test@admin.com",
    subject: "Password reset",
    text: `Your password reset code is ${passwordResetCode}. Id: ${user._id}`,
  });

  log.debug(`Password reset email sent to ${user.email}`);
  return res.status(200).json({ message: "Password reset email sent" });
};

export const resetPasswordHandler = async (
  request: Request<
    ResetPasswordInput["params"],
    {},
    ResetPasswordInput["body"]
  >,
  response: Response
) => {
  const { id, passwordResetCode } = request.params;
  const { password, passwordConfirmation } = request.body;
  const user = await findUserById(id);

  if (
    !user ||
    !user.passwordResetCode ||
    user.passwordResetCode === passwordResetCode
  ) {
    return response.status(400).json({ message: "Could not reset password" });
  }

  user.passwordResetCode = null;

  user.password = password;

  await user.save();

  return response.status(200).json({ message: "Password reset successfully" });
};
