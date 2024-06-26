"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_post = exports.signup_post = void 0;
const client_1 = require("../../node_modules/.prisma/client");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const maxAge = 3 * 24 * 60 * 60; // 3 days
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, 'the secret stored in env', {
        expiresIn: maxAge
    });
};
const signup_post = async (req, res) => {
    const isEmail = validator_1.default.isEmail(req.body.email);
    const isLength = validator_1.default.isLength(req.body.password, { min: 6, max: undefined });
    const salt = await bcrypt_1.default.genSalt();
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
        const password = await bcrypt_1.default.hash(req.body.password, salt);
        const data = {
            email: req.body.email,
            password
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
                const token = createToken(user.id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
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
// another way to singup_post using try catch block
// export const signup_post = async (req: any, res: any) => {
//     const isEmail = validator.isEmail(req.body.email);
//     const isLength = validator.isLength(req.body.password, { min: 6, max: undefined });
//     if (!isEmail) {
//         res.status(400).json({
//             "status": {
//                 error: true,
//                 code: 400,
//                 type: "Bad Request",
//                 message: "Email is not valid"
//             }
//         });
//     } else if (!isLength) {
//         res.status(400).json({
//             "status": {
//                 error: true,
//                 code: 400,
//                 type: "Bad Request",
//                 message: "Password should be at least 6 characters"
//             }
//         });
//     } else {
//         const data = {
//             email: req.body.email,
//             password: req.body.password
//         };
//         try {
//             const user = await prisma.users.create({ data });
//             res.status(201).json({
//                 "status": {
//                     error: false,
//                     code: 201,
//                     type: "success",
//                     message: "User created successfully"
//                 }
//             });
//         } catch (error) {
//             console.log(error);
//             handleError(error);
//             res.status(400).json({
//                 "status": {
//                     error: true,
//                     code: 400,
//                     type: "Bad Request",
//                     message: "User not created"
//                 }
//             })
//         }
//     }
// }
async function login_post(req, res) {
    const isEmail = validator_1.default.isEmail(req.body.email);
    const isLength = validator_1.default.isLength(req.body.password, { min: 6, max: undefined });
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
                email: req.body.email
            }
        });
        if (user && bcrypt_1.default.compareSync(req.body.password, user.password)) {
            const token = createToken(user.id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
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
function handleError(error) {
    // throw new Error("Function not implemented.");
    console.log("Handling error" + error.message + ": errror message" + error.code);
}
