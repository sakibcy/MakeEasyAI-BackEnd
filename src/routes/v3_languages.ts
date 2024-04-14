import express, {Request, Response} from "express";
import {getSupportedLanguagesV2} from "../apis/googleTranslateAPI_v2";
import {getSupportedLanguagesV3} from "../apis/googleTranslateAPI_v3";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const lang = await getSupportedLanguagesV3();
    res.send(lang)
});

module .exports = router;