import express, {Request, Response} from "express";
import {getSupportedLanguagesV2} from "../apis/googleTranslateAPI_v2";
import {summarizerGoogleAPI} from "../apis/summarizerGoogleAI";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    const text = req.body.text;
    try {
        const result = await summarizerGoogleAPI(text);
        if (result) {
            // let ans = result;
            // res.send(ans.candidates[0].content.parts[0].text);
            res.send(result);
        }
    } catch (err) {
        console.log(err)
    }
})

export default router;