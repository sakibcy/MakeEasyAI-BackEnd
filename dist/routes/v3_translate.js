"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleTranslateAPI_v3_1 = require("../apis/googleTranslateAPI_v3");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/", authMiddleware_1.requireAuth, async (req, res) => {
    const targetLanguageCode = req.body.targetLanguageCode;
    const contents = req.body.contents;
    if (contents[0].length > 30000) {
        res.send("Content length must be less than 30,000 character, If you need to translate text exceeding 30,000 then use 'BatchTranslateText' ");
    }
    try {
        const lang = await (0, googleTranslateAPI_v3_1.callTranslateText_V3)(contents, targetLanguageCode);
        res.send(lang);
    }
    catch (error) {
        console.log(error);
        res.send('The is an error sending request, please make sure everything is correct or check your internet connection');
    }
});
exports.default = router;
