// Import necessary modules and entities
import { Router } from "express";
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getFilteredExpenses,
  updateExpense,
} from "../controllers/ExpenseController";
import UploadHandler from "../middlewares/UploadHandler";  // Middleware for handling file uploads
import {
  validateRequestBody,
  validateRequestQuery,
} from "../middlewares/Validator";  // Middleware for validating request body and query parameters
import {
  expenseBodySchema,
  expenseQuerySchema,
} from "../validations/ValidationSchema";  // Validation schemas for expense-related operations

// Create a router instance
const router = Router();

// Define routes for handling expense operations
router
  .route("/")
  .get(getAllExpenses)  // GET request to fetch all expenses
  .post(
    UploadHandler.single("image"),  // Middleware for handling single file upload with the field name "image"
    validateRequestBody(expenseBodySchema),  // Validate the request body against the expense body schema
    createExpense  // POST request to create a new expense
  )
  .put(updateExpense);  // PUT request to update an existing expense

router.delete("/:id", deleteExpense);  // DELETE request to delete an expense by ID
router.get(
  "/filter",
  validateRequestQuery(expenseQuerySchema),
  getFilteredExpenses  // GET request to fetch filtered expenses based on query parameters
);

// Export the router
export default router;
