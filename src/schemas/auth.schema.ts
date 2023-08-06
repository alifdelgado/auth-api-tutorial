import { TypeOf, object, string } from "zod";

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }).email({
      message: "Not a valid email",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password must be at least 6 characters"),
  }),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>["body"];
