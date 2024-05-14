"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// export const startDB = async () => {
//     // @ts-ignore
//     const client = new Client({
//         host: process.env.PGHOST,
//         port: 5432,
//         user: process.env.PGUSER,
//         password: process.env.PGPASSWORD,
//         database: process.env.PGDATABASE
//     })
//     await client.connect()
//
//     const res = await client.query('SELECT * FROM USERS')
//
//     console.log(`here is ${res}`)
//     await client.end()
// }
