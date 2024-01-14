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
const router = Router();

router
  .route("/")
  .get(getAllBudgets)
  .post(validateRequestBody(budgetBodySchema), createBudget)
  .put(updateBudget);
router.delete("/:id", deleteBudget);
router.get("/filter", validateRequestQuery(budgetQuerySchema), getAllFilteredBudgets);

export default router;
