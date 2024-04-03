"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const googleTranslateAPI_v2_1 = require("./googleTranslateAPI_v2");
const googleTranslateAPI_v3_1 = require("./googleTranslateAPI_v3");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json()); // for parsing application/json
app.use(express_1.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.get("/api/v2/languages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lang = yield (0, googleTranslateAPI_v2_1.getSupportedLanguagesV2)();
    res.send(lang);
}));
app.get("/api/v3/languages", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lang = yield (0, googleTranslateAPI_v3_1.getSupportedLanguagesV3)();
    res.send(lang);
}));
app.post("/api/v3/translateText", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const targetLanguageCode = req.body.targetLanguageCode;
    const contents = req.body.contents;
    if (contents[0].length > 30000) {
        res.send("Content length must be less than 30,000 character, If you need to translate text exceeding 30,000 then use 'BatchTranslateText' ");
    }
    try {
        const lang = yield (0, googleTranslateAPI_v3_1.callTranslateText_V3)(contents, targetLanguageCode);
        res.send(lang);
    }
    catch (error) {
        console.log(error);
        res.send('The is an error sending request, please make sure everything is correct or check your internet connection');
    }
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
