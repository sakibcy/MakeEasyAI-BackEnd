import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getLanguagesV2 } from "./googleTranslateAPI_v2";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/api/v2/languages", async (req: Request, res: Response) => {
  const lang = await getLanguagesV2();
  res.send(lang)
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});