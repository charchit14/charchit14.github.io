// Import necessary modules and entities
import { Router } from "express";
import {
  createBudget,
  deleteBudget,
  getAllBudgets,
  getAllFilteredBudgets,
  updateBudget
} from "../controllers/BudgetController";
import {
  validateRequestBody,
  validateRequestQuery,
} from "../middlewares/Validator";
import {
  budgetBodySchema,
  budgetQuerySchema,
} from "../validations/ValidationSchema";

// Create a router instance
const router = Router();

// Define routes for handling budget operations
router
  .route("/")
  .get(getAllBudgets)  // GET request to fetch all budgets
  .post(validateRequestBody(budgetBodySchema), createBudget)  // POST request to create a new budget
  .put(updateBudget);  // PUT request to update an existing budget

router.delete("/:id", deleteBudget);  // DELETE request to delete a budget by ID
router.get("/filter", validateRequestQuery(budgetQuerySchema), getAllFilteredBudgets);  // GET request to fetch filtered budgets

// Export the router
export default router;
