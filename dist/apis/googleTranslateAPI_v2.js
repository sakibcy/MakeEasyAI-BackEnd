"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupportedLanguagesV2 = exports.translateTextV2 = exports.detectLanguageV2 = void 0;
const v2_1 = require("@google-cloud/translate/build/src/v2");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// Your credentials
const CREDENTIALS = JSON.parse(`${(_a = process.env.CREDENTIALS) === null || _a === void 0 ? void 0 : _a.toString()}`);
// Configuration for the client
const translate = new v2_1.Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});
const detectLanguageV2 = async (text) => {
    try {
        let response = await translate.detect(text);
        return response[0].language;
    }
    catch (error) {
        console.log(`Error at detectLanguage --> ${error}`);
        return 0;
    }
};
exports.detectLanguageV2 = detectLanguageV2;
// detectLanguageV2('Oggi è lunedì')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
const translateTextV2 = async (text, targetLanguage) => {
    try {
        let [response] = await translate.translate(text, targetLanguage);
        return response;
    }
    catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
};
exports.translateTextV2 = translateTextV2;
// translateTextV2('Oggi è lunedì', 'en')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
const getSupportedLanguagesV2 = async () => {
    try {
        const res = await translate.getLanguages();
        return res[0];
    }
    catch (error) {
        console.log(error);
    }
};
exports.getSupportedLanguagesV2 = getSupportedLanguagesV2;
// getLanguagesV2()
// .then((res) => {
//     console.log(res);
// })
// .catch((err) => {
//     console.log(err);
// });
