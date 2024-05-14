"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const summarizerGoogleAI_1 = require("../apis/summarizerGoogleAI");
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    const text = req.body.text;
    try {
        const result = await (0, summarizerGoogleAI_1.summarizerGoogleAPI)(text);
        if (result) {
            // let ans = result;
            // res.send(ans.candidates[0].content.parts[0].text);
            res.send(result);
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = router;
