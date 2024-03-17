import express from "express";
import { login } from "../controllers/auth.js";
import cors from "cors";

const router = express.Router();

router.use(cors());

router.post("/login", login);

export default router;
