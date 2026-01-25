import express from "express";
import { Role } from "../generated/prisma/enums";
import { verifyJwtTokenMiddleware } from "../middleware/auth.jwt.middleware";
import { requireRole } from "../middleware/role.middleware";
import { createCourseController, getACourseController, getAllCoursesController, updateCourseController, deleteCourseController } from "../controllers/courses.controller";
import { getCourseLessonController } from "../controllers/lessons.controller";

const router = express.Router();

router.get("/", verifyJwtTokenMiddleware, getAllCoursesController);
router.get("/:id", verifyJwtTokenMiddleware, getACourseController);


//instructor
router.post("/", verifyJwtTokenMiddleware, requireRole(Role.INSTRUCTOR), createCourseController);
router.patch("/:id", verifyJwtTokenMiddleware, requireRole(Role.INSTRUCTOR), updateCourseController);
router.delete("/:id", verifyJwtTokenMiddleware, requireRole(Role.INSTRUCTOR), deleteCourseController);


//lessons

router.get("/:courseId/lessons", getCourseLessonController);
//student


export default router;