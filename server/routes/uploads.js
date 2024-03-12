import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUserUploads, getDevice } from "../controllers/upload.js";

const router = express.Router();

router.get("/:userId/uploads",verifyToken,getUserUploads);

router.get("/:productId/device",verifyToken, getDevice);

export default router;

