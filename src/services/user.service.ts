import UserModel, { User } from "../models/user.model";

export const createUser = (input: Partial<User>) => {
  return UserModel.create(input);
};
