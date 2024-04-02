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
exports.getLanguages = exports.translateText = exports.detectLanguage = void 0;
const v2_1 = require("@google-cloud/translate/build/src/v2");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Your credentials
const CREDENTIALS = require('./nth-aggregator-419009-52d26a665e15.json');
// Configuration for the client
const translate = new v2_1.Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});
const detectLanguage = (text) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield translate.detect(text);
        return response[0].language;
    }
    catch (error) {
        console.log(`Error at detectLanguage --> ${error}`);
        return 0;
    }
});
exports.detectLanguage = detectLanguage;
// detectLanguage('Oggi è lunedì')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
const translateText = (text, targetLanguage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let [response] = yield translate.translate(text, targetLanguage);
        return response;
    }
    catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
});
exports.translateText = translateText;
// translateText('Oggi è lunedì', 'en')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
const getLanguages = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield translate.getLanguages();
    return res;
});
exports.getLanguages = getLanguages;
// getLanguages()
// .then((res) => {
//     console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// });
