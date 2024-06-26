"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.setHeader('Set-Cookie', 'newUser=true');
    res.cookie('TestCookie', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.send("You set the cookie");
});
router.get("/get-cookie", (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    res.send(cookies);
});
exports.default = router;
