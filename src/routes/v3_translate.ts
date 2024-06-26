import express, { Request, Response } from "express";
import { callTranslateText_V3 } from "../apis/googleTranslateAPI_v3";
import { requireAuth } from "../middleware/authMiddleware"

const router = express.Router();

router.post("/", requireAuth, async (req: Request, res: Response) => {
    const targetLanguageCode = req.body.targetLanguageCode;
    const contents = req.body.contents;

    if (contents[0].length > 30000) {
        res.send("Content length must be less than 30,000 character, If you need to translate text exceeding 30,000 then use 'BatchTranslateText' ")
    }

    try {
        const lang = await callTranslateText_V3(contents, targetLanguageCode);
        res.send(lang)
    } catch (error) {
        console.log(error);
        res.send('The is an error sending request, please make sure everything is correct or check your internet connection')
    }
});

export default router;