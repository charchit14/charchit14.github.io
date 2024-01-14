import { Router } from "express";
import auth from "./Auth";
import budget from "./Budget";
import category from "./Category";
import expenses from "./Expense";
import images from "./Images";
import income from "./Income";
import users from "./User";
import { jwtAuth } from "../middlewares/JwtAuth";
const router = Router();

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
/* --------------------------- Initial Home Route --------------------------- */
router.get("/", (req, res) => {
  res.json({
    message: "Hello World from the Expense Tracker API!!",
  });
});

/* ------------------------------- Sub Routes ------------------------------- */
// Authentication routes
router.use(auth);
// User routes
router.use("/users", jwtAuth, users);
// Expense routes
router.use("/expenses", jwtAuth, expenses);
// Category routes
router.use("/categories", jwtAuth, category);
// Budget routes
router.use("/budgets", jwtAuth, budget);
// Income routes
router.use("/incomes", jwtAuth, income);
// Image routes
router.use("/images", images);
// Export the router
export default router;
