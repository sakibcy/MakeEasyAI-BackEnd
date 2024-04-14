import { NextHandleFunction } from "connect";
import express from "express";

const v2_languages = require("../routes/v2_languages");
const v3_languages = require("../routes/v3_languages");

module.exports = function (app: any) {
    // @ts-ignore
    app.use(express.json())
    app.use('/api/v2/languages', v2_languages);
    app.use('/api/v3/languages', v3_languages);
}