import { Request, Response } from "express";
import { CreateSessionInput } from "../schemas/auth.schema";
import { findUserByEmail } from "../services/user.service";
import { signAccessToken, signRefreshToken } from "../services/auth.service";

export const createSessionHandler = async (
  req: Request<{}, {}, CreateSessionInput>,
  res: Response
) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (!user)
    return res.status(404).json({ message: "Email or password are not valid" });

  if (!user.verified)
    return res.status(401).json({ message: "User not verified" });

  const isValid = await user.verifyPassword(password);

  if (!isValid)
    return res.status(401).json({ message: "Email or password are not valid" });

  const accessToken = signAccessToken(user);
  const refreshToken = await signRefreshToken({ userId: user._id });

  return res.status(200).json({ accessToken, refreshToken });
};
