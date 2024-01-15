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

// Setting up the routes
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Finacne Management System",
  });
});

// Sub routes
router.use(auth);
router.use("/users", jwtAuth, users);
router.use("/expenses", jwtAuth, expenses);
router.use("/categories", jwtAuth, category);
router.use("/budgets", jwtAuth, budget);
router.use("/incomes", jwtAuth, income);
router.use("/images", images);

// Exporting the routers
export default router;
