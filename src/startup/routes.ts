import { NextHandleFunction } from "connect";
import express from "express";
var cookieParser = require('cookie-parser')


import v2_languages from "../routes/v2_languages";
import v3_languages from "../routes/v3_languages";
import summarizer from "../routes/summarizer";
import v3_translate from "../routes/v3_translate";
import entry from "../routes/entry";
import authRoutes from "../routes/authRoutes";
import { requireAuth } from "../middleware/authMiddleware";
import { API_VERSION } from "../config";

module.exports = function (app: any) {
    // @ts-ignore
    app.use(express.json()) // for parsing application/json
    app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
    app.use(cookieParser());

    app.use(`/${API_VERSION}/languagesv2`, v2_languages);
    app.use(`/${API_VERSION}/languages`, v3_languages);
    app.use(`/${API_VERSION}/summarizer`, summarizer);
    app.use(`/${API_VERSION}/translate_text`, v3_translate);
    app.use(`/${API_VERSION}/`, authRoutes);
}