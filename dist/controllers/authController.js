"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_post = exports.signup_post = void 0;
const client_1 = require("../../node_modules/.prisma/client");
const validator = require("validator");
const prisma = new client_1.PrismaClient();
const signup_post = async (req, res) => {
    const isEmail = validator.isEmail(req.body.email);
    const isLength = validator.isLength(req.body.password, { min: 6, max: undefined });
    if (!isEmail) {
        res.status(400).json({
            "status": {
                error: true,
                code: 400,
                type: "Bad Request",
                message: "Email is not valid"
            }
        });
    }
    else if (!isLength) {
        res.status(400).json({
            "status": {
                error: true,
                code: 400,
                type: "Bad Request",
                message: "Password should be at least 6 characters"
            }
        });
    }
    else {
        const data = {
            email: req.body.email,
            password: req.body.password
        };
        const user = await prisma.users.findUnique({
            where: {
                email: req.body.email,
            }
        });
        if (user) {
            res.json({
                "status": {
                    error: true,
                    code: 401,
                    type: "Unauthorized",
                    message: "User already exists"
                }
            });
        }
        else {
            const user = await prisma.users.create({ data });
            if (user) {
                res.status(201).json({
                    "status": {
                        error: false,
                        code: 201,
                        type: "success",
                        message: "User created successfully"
                    }
                });
            }
        }
    }
};
exports.signup_post = signup_post;
async function login_post(req, res) {
    const isEmail = validator.isEmail(req.body.email);
    const isLength = validator.isLength(req.body.password, { min: 6, max: undefined });
    if (!isEmail) {
        res.status(400).json({
            "status": {
                error: true,
                code: 400,
                type: "Bad Request",
                message: "Email is not valid"
            }
        });
    }
    else if (!isLength) {
        res.status(400).json({
            "status": {
                error: true,
                code: 400,
                type: "Bad Request",
                message: "Password should be at least 6 characters"
            }
        });
    }
    else {
        const user = await prisma.users.findUnique({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        });
        if (user) {
            res.json({
                "status": {
                    error: false,
                    code: 200,
                    type: "success",
                    message: "User logged in successfully"
                }
            });
        }
        else {
            res.status(401).json({
                "status": {
                    error: true,
                    code: 401,
                    type: "Unauthorized",
                    message: "Authentication Failure User not registered or check your Email and Password"
                }
            });
        }
    }
}
exports.login_post = login_post;
