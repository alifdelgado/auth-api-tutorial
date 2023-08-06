import { DocumentType } from "@typegoose/typegoose";
import { omit } from "lodash";
import { signJwt } from "../utils/jwt";
import SessionModel from "../models/session.model";
import { User, privateFields } from "../models/user.model";

export const createSession = async ({ userId }: { userId: any }) => {
  return await SessionModel.create({ user: userId });
};

export const signAccessToken = (user: DocumentType<User>) => {
  const payload = omit(user.toJSON(), privateFields);
  return signJwt(payload, "accessTokenPrivateKey", {
    expiresIn: "1y",
  });
};

export const signRefreshToken = async ({ userId }: { userId: any }) => {
  const session = await createSession({ userId });
  return signJwt({ session: session._id }, "refreshTokenPrivateKey", {
    expiresIn: "15m",
  });
};

export const findSessionById = async (id: string) => {
  return await SessionModel.findById(id);
};
