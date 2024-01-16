// Import necessary modules and entities
import { Router } from "express";
const router = Router();
import {
  getIncome,
  createIncome,
  updateIncome,
  deleteIncome,
} from "../controllers/IncomeController";
import {
  validateRequestBody,
  validateRequestQuery,
} from "../middlewares/Validator";
import {
  incomeBodySchema,
  incomeQuerySchema,
} from "../validations/ValidationSchema";

// Define routes for handling income-related operations
router
  .route("/")
  .get(getIncome)  // Route for fetching income
  .post(validateRequestBody(incomeBodySchema), createIncome)  // Route for creating income
  .put(updateIncome);  // Route for updating income

router.delete("/:id", deleteIncome);  // Route for deleting income
router.get("/filter", validateRequestQuery(incomeQuerySchema));  // Route for filtering income

// Export the router
export default router;
