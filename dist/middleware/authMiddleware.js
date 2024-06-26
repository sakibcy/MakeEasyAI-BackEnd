"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuth = (req, res, next) => {
    var _a;
    const tokenFromHeader = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    const tokenFromCookie = req.cookies.jwt;
    const token = tokenFromHeader || tokenFromCookie;
    if (!token) {
        return res.status(401).json({
            "status": {
                error: true,
                code: 401,
                type: "Unauthorized",
                message: "You are not authorized to access this"
            }
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'the secret stored in env');
        next();
    }
    catch (error) {
        res.status(403).json({
            "status": {
                error: true,
                code: 403,
                type: "Forbidden",
                message: "You are forbidden to access this"
            }
        });
    }
};
exports.requireAuth = requireAuth;
