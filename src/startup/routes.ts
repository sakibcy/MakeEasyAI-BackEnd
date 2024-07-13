import express, { Application } from "express";

import v2_languages from "../routes/v2_languages";
import v3_languages from "../routes/v3_languages";
import summarizer from "../routes/summarizer";
import v3_translate from "../routes/v3_translate";
import authRoutes from "../routes/authRoutes";
import { API_VERSION } from "../config";
import authenticated from '../routes/authenticated';

module.exports = function (app: Application) {
    const middleware = [
        express.json(),
        express.urlencoded({extended: true}),
        require('cookie-parser')()
    ]

    app.use(middleware);

    app.use(`/${API_VERSION}/languagesv2`, v2_languages);
    app.use(`/${API_VERSION}/languages`, v3_languages);
    app.use(`/${API_VERSION}/summarizer`, summarizer);
    app.use(`/${API_VERSION}/translate_text`, v3_translate);
    app.use(`/`, authRoutes);
    app.use(`/authenticated`, authenticated);
}