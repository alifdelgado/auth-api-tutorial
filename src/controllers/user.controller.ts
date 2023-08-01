import { Request, Response } from "express";
import { CreateUserInput } from "../schemas/user.schema";

export const createUserHandler = (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  const body = req.body;
};
