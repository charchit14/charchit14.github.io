// Import necessary modules and controllers
import { Router } from "express";
import { getUserById, getUserSummary } from "../controllers/UserController";
const router = Router();

// Define routes for user management
router.get("/", getUserById); // Route to get user details by ID
router.route("/:id").delete().patch(); // Placeholder routes for additional user actions (e.g., delete, update)
router.get("/summary", getUserSummary); // Route to get user summary

export default router;
