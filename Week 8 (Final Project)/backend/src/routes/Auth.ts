import { Router } from "express";
import {
  login,
  register,
  logout,
  refresh,
} from "../controllers/AuthController";
import { validateRequestBody } from "../middlewares/Validator";
import { userBodySchema, userLoginSchema } from "../validations/UserSchema";
const router = Router();

router.post("/login", validateRequestBody(userLoginSchema), login);
router.post("/register", validateRequestBody(userBodySchema), register);
router.post("/logout", logout);
router.post("/refresh", refresh);

export default router;
