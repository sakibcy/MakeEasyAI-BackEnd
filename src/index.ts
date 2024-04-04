import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getSupportedLanguagesV2 } from "./googleTranslateAPI_v2";
import { callTranslateText_V3, getSupportedLanguagesV3 } from "./googleTranslateAPI_v3";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get("/", (req: Request, res: Response) => {
  res.send("Testing 8:10pm")
})

app.get("/api/v2/languages", async (req: Request, res: Response) => {
  const lang = await getSupportedLanguagesV2();
  res.send(lang)
});

app.get("/api/v3/languages", async (req: Request, res: Response) => {
  const lang = await getSupportedLanguagesV3();
  res.send(lang)
});

interface TranslateTextV3 {
  contents: [];
  targetLanguageCode: string;
}
app.post("/api/v3/translate_text", async (req: Request, res: Response) => {
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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});