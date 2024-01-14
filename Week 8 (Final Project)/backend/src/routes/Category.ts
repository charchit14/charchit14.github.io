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
const router = Router();

router
  .route("/")
  .get(getAllCategories)
  .post(validateRequestBody(categoryBodySchema), createCategory)
  .put(updateCategory);
router.delete("/:id", deleteCategory);
router.get("/filter", validateRequestQuery(categoryQuerySchema), getCategory);

export default router;
