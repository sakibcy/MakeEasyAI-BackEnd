import express, {Request, Response} from "express";
import {getSupportedLanguagesV3} from "../apis/googleTranslateAPI_v3";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", requireAuth, async (req: Request, res: Response) => {
    const lang = await getSupportedLanguagesV3();
    res.send(lang)
});

export default router;