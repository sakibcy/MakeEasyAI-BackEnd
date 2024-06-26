"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var cookieParser = require('cookie-parser');
const v2_languages_1 = __importDefault(require("../routes/v2_languages"));
const v3_languages_1 = __importDefault(require("../routes/v3_languages"));
const summarizer_1 = __importDefault(require("../routes/summarizer"));
const v3_translate_1 = __importDefault(require("../routes/v3_translate"));
const entry_1 = __importDefault(require("../routes/entry"));
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
module.exports = function (app) {
    // @ts-ignore
    app.use(express_1.default.json()); // for parsing application/json
    app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(cookieParser());
    app.use('/', entry_1.default);
    app.use('/api/v2/languages', v2_languages_1.default);
    app.use('/api/v3/languages', v3_languages_1.default);
    app.use('/api/summarizer', summarizer_1.default);
    app.use('/api/v3/translate_text', v3_translate_1.default);
    app.use(`/`, authRoutes_1.default);
};
