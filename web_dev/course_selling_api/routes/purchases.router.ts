import express from "express"
import { getStudentPurchasesCourseController, purchaseCourseController } from "../controllers/purchases.controller";
import { Role } from "../generated/prisma/enums";
import { verifyJwtTokenMiddleware } from "../middleware/auth.jwt.middleware";
import { requireRole } from "../middleware/role.middleware";

const router = express.Router();


router.post("/purchases", verifyJwtTokenMiddleware, requireRole(Role.STUDENT), purchaseCourseController);
router.get("/users/:id/purchases", verifyJwtTokenMiddleware, requireRole(Role.STUDENT), getStudentPurchasesCourseController);


export default router;