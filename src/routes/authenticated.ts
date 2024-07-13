import express from "express";
import { requireAuth } from "../middleware/authMiddleware";
import { generateResponse } from "../utils/generateResponse";

const router = express.Router();

router.get("/", requireAuth, (req, res) => {
    res.status(200).json(generateResponse(false, 200, 'Success', 'User is authenticated'));
});

export default router;