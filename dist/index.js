"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// @ts-ignore
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./startup/db");
dotenv_1.default.config();
(0, db_1.startDB)();
const app = (0, express_1.default)();
require('./startup/routes')(app);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
