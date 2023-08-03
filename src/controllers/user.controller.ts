import { Request, Response } from "express";
import { CreateUserInput } from "../schemas/user.schema";
import { createUser } from "../services/user.service";
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
      return res.status(409).send("User already exists");
    }
    return res.status(500).send("Error creating user");
  }
};
