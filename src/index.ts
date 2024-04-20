import express, {Express} from "express";
// @ts-ignore
import dotenv from "dotenv";
import {startDB} from "./startup/db";

dotenv.config();

startDB();

const app: Express = express();

require('./startup/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});