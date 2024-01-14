import { Router } from "express";
import { getUserById,getUserSummary } from "../controllers/UserController";
const router = Router();

router.get("/", getUserById);
router.route("/:id").delete().patch();
router.get("/summary", getUserSummary);

export default router;
