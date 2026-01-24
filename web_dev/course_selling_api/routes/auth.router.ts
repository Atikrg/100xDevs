import express from "express";
import { Router } from "express";
import { signupController } from "../controllers/auth.controller"

const router = express.Router();


router.post("/auth/signup", signupController);

export default router;