import { NextHandleFunction } from "connect";
import express from "express";
var cookieParser = require('cookie-parser')


import v2_languages from "../routes/v2_languages";
import v3_languages from "../routes/v3_languages";
import summarizer from "../routes/summarizer";
import v3_translate from "../routes/v3_translate";
import entry from "../routes/entry";
import authRoutes from "../routes/authRoutes";

module.exports = function (app: any) {
    // @ts-ignore
    app.use(express.json()) // for parsing application/json
    app.use(express.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
    app.use(cookieParser());

    app.use('/', entry);
    app.use('/api/v2/languages', v2_languages);
    app.use('/api/v3/languages', v3_languages);
    app.use('/api/summarizer', summarizer);
    app.use('/api/v3/translate_text', v3_translate);
    app.use(`/`, authRoutes);
}