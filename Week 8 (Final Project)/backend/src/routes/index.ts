// Import necessary modules and entities
import { Router } from "express";
import auth from "./Auth"; // Import authentication routes
import budget from "./Budget"; // Import budget routes
import category from "./Category"; // Import category routes
import expenses from "./Expense"; // Import expense routes
import images from "./Images"; // Import image routes
import income from "./Income"; // Import income routes
import users from "./User"; // Import user routes
import { jwtAuth } from "../middlewares/JwtAuth"; // Import JWT authentication middleware
const router = Router();

// Setting up the root route
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Finance Management System",
  });
});

// Sub routes with JWT authentication middleware
router.use(auth); // Include authentication routes
router.use("/users", jwtAuth, users); // Include user routes with JWT authentication
router.use("/expenses", jwtAuth, expenses); // Include expense routes with JWT authentication
router.use("/categories", jwtAuth, category); // Include category routes with JWT authentication
router.use("/budgets", jwtAuth, budget); // Include budget routes with JWT authentication
router.use("/incomes", jwtAuth, income); // Include income routes with JWT authentication
router.use("/images", images); // Include image routes

// Exporting the router
export default router;
