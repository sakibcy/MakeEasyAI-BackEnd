"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateResponse_1 = require("../utils/generateResponse");
const requireAuth = (req, res, next) => {
    var _a;
    const tokenFromHeader = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const tokenFromCookie = req.cookies.jwt;
    const token = tokenFromHeader || tokenFromCookie;
    if (!token) {
        res
            .status(401)
            .json((0, generateResponse_1.generateResponse)(true, 401, "Unauthorized", "You are not authorized to access this"));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'the secret stored in env');
        next();
    }
    catch (error) {
        res
            .status(403)
            .json((0, generateResponse_1.generateResponse)(true, 401, "Unauthorized", "You are not authorized to access this"));
    }
};
exports.requireAuth = requireAuth;
