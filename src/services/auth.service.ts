import { DocumentType } from "@typegoose/typegoose";
import { User } from "../models/user.model";
import { signJwt } from "../utils/jwt";
import SessionModel from "../models/session.model";

export const createSession = async ({ userId }: { userId: any }) => {
  return SessionModel.create({ user: userId });
};

export const signAccessToken = (user: DocumentType<User>) => {
  const payload = user.toJSON();
  return signJwt(payload, "accessTokenPrivateKey");
};

export const signRefreshToken = async ({ userId }: { userId: any }) => {
  const session = await createSession({ userId });
  return signJwt({ session: session._id }, "refreshTokenPrivateKey");
};
