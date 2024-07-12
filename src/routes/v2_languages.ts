import express, {Request, Response} from "express";
import {getSupportedLanguagesV2} from "../apis/googleTranslateAPI_v2";
import { requireAuth } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", requireAuth, async (req: Request, res: Response) => {
    const lang = await getSupportedLanguagesV2();
    res.send(lang)
});

export default router;