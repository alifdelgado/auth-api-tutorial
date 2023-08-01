import { Router } from "express";
import { createUserHandler } from "../controllers/user.controller";
import { createUserSchema } from "../schemas/user.schema";
import { validateResource } from "../middlewares/validate-resource";

const router = Router();

router.post("", validateResource(createUserSchema), createUserHandler);

export default router;
