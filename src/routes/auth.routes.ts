import { Router } from "express";
import { createSessionHandler } from "../controllers/auth.controller";
import { validateResource } from "../middlewares/validate-resource";
import { createSessionSchema } from "../schemas/auth.schema";

const router = Router();

router.post(
  "/session",
  validateResource(createSessionSchema),
  createSessionHandler
);

export default router;
