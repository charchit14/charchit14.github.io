// Import necessary modules and entities
import { Router } from "express";
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/CategoryController";
import {
  validateRequestBody,
  validateRequestQuery,
} from "../middlewares/Validator";
import {
  categoryBodySchema,
  categoryQuerySchema,
} from "../validations/ValidationSchema";

// Create a router instance
const router = Router();

// Define routes for handling category operations
router
  .route("/")
  .get(getAllCategories)  // GET request to fetch all categories
  .post(validateRequestBody(categoryBodySchema), createCategory)  // POST request to create a new category
  .put(updateCategory);  // PUT request to update an existing category

router.delete("/:id", deleteCategory);  // DELETE request to delete a category by ID
router.get("/filter", validateRequestQuery(categoryQuerySchema), getCategory);  // GET request to fetch a category by filter

// Export the router
export default router;
