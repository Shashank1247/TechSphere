import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUserUploads } from "../controllers/upload.js";

const router = express.Router();

router.get("/:userId/uploads",verifyToken,getUserUploads);

export default router;

