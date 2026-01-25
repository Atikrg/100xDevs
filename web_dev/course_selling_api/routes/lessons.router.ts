import express from "express";
import { createLessonController, getCourseLessonController } from "../controllers/lessons.controller";
import { requireRole } from "../middleware/role.middleware";
import { Role } from "../generated/prisma/enums";
import { verifyJwtTokenMiddleware } from "../middleware/auth.jwt.middleware";

const router = express.Router();


router.post("/", verifyJwtTokenMiddleware, requireRole(Role.INSTRUCTOR), createLessonController);
router.get("/users/:id/lessons", getCourseLessonController)

export default router;
