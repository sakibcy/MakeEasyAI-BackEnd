import express, {Request, Response} from "express";
import {getSupportedLanguagesV2} from "../apis/googleTranslateAPI_v2";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const lang = await getSupportedLanguagesV2();
    res.send(lang)
});

export default router;