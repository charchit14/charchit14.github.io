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

router
  .route("/")
  .get(getIncome)
  .post(validateRequestBody(incomeBodySchema), createIncome)
  .put(updateIncome);
router.delete("/:id", deleteIncome);
router.get("/filter", validateRequestQuery(incomeQuerySchema));

export default router;
