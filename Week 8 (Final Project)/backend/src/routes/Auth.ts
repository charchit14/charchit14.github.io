// Import necessary modules and entities
import { Router } from "express";
import {
  login,
  register,
  logout,
  refresh,
} from "../controllers/AuthController";
import { validateRequestBody } from "../middlewares/Validator";
import { userBodySchema, userLoginSchema } from "../validations/UserSchema";

// Create a router instance
const router = Router();

// Define routes for login, register, logout, and token refresh
router.post("/login", validateRequestBody(userLoginSchema), login);
router.post("/register", validateRequestBody(userBodySchema), register);
router.post("/logout", logout);
router.post("/refresh", refresh);

// Export the router
export default router;
