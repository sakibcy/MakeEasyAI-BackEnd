"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const googleTranslateAPI_v3_1 = require("../apis/googleTranslateAPI_v3");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    const lang = await (0, googleTranslateAPI_v3_1.getSupportedLanguagesV3)();
    res.send(lang);
});
exports.default = router;
