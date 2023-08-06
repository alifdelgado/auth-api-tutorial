import { Router } from "express";
import {
  createUserHandler,
  forgotPasswordHandler,
  getCurrentUserHandler,
  resetPasswordHandler,
  verifyUserHandler,
} from "../controllers/user.controller";
import {
  createUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from "../schemas/user.schema";
import { validateResource } from "../middlewares/validate-resource";
import requireUser from "../middlewares/require-user";

const router = Router();

router.post("", validateResource(createUserSchema), createUserHandler);
router.post(
  "/verify/:id/:verficationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);
router.post(
  "forgot-password",
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);
router.post(
  "/reset-password/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);
router.get("/me", requireUser, getCurrentUserHandler);

export default router;
