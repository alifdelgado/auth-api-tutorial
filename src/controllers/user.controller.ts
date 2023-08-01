import { Request, Response } from "express";
import { CreateUserInput } from "../schemas/user.schema";
import { createUser } from "../services/user.service";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) => {
  const body = req.body;

  try {
    const user = await createUser(body);
    return res.status(201).send("User created successfully");
  } catch (e) {
    if (e.code === 11000) {
      return res.status(409).send("User already exists");
    }
    return res.status(500).send("Error creating user");
  }
};
