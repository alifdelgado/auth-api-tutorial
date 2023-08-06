import jwt from "jsonwebtoken";
import env from "../config/default";

export const signJwt = (
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined
) => {
  const signinKey = keyName.includes("accessToken")
    ? env.ACCESS_TOKEN_PRIVATE_KEY
    : env.REFRESH_TOKEN_PRIVATE_KEY;

  return jwt.sign(object, signinKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = <T>(
  token: string,
  keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
) => {
  const publicKey = keyName.includes("accessToken")
    ? env.ACCESS_TOKEN_PUBLIC_KEY
    : env.REFRESH_TOKEN_PUBLIC_KEY;

  try {
    return jwt.verify(token, publicKey) as T;
  } catch (e) {
    return null;
  }
};
