import { Router } from "express";
import { authorize } from "../middleware/auth";
import favoriteController from "../controllers/favorite";
import validateSchema from "../middleware/validate";
import { getAllRentSchema } from "../validation/rent";

const router = Router();
router.get("/without-pagination", favoriteController.getAllWOPagination);
router.get("/", validateSchema(getAllRentSchema), favoriteController.getAll);
router.post("/:id", authorize(), favoriteController.toggle);

export default router;
