import { get } from "lodash";
import { Request, Response } from "express";
import { CreateSessionInput } from "../schemas/auth.schema";
import { findUserByEmail, findUserById } from "../services/user.service";
import {
  findSessionById,
  signAccessToken,
  signRefreshToken,
} from "../services/auth.service";
import { verifyJwt } from "../utils/jwt";

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

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response
) => {
  const refreshToken: any = get(req, "headers.x-refresh");
  const decoded = verifyJwt<{ session: string }>(
    refreshToken,
    "refreshTokenPublicKey"
  );

  if (!decoded)
    return res.status(401).json({ message: "Invalid refresh token" });

  const session = await findSessionById(decoded.session);

  if (!session || !session.valid)
    return res.status(401).json({ message: "Could not refresh access token" });

  const user = await findUserById(String(session.user));

  if (!user)
    return res.status(401).json({ message: "Could not refresh access token" });

  const accessToken = signAccessToken(user);

  return res.status(200).json({ accessToken });
};
