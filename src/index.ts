import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import { PrismaClient } from './generated/client'

const prisma = new PrismaClient()

import db from "./startup/db";
dotenv.config();


const app: Express = express();

require('./startup/routes')(app);
db()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});