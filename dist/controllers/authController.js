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
const generateResponse_1 = require("../utils/generateResponse");
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
        res
            .status(400)
            .json((0, generateResponse_1.generateResponse)(true, 400, "Bad Request", "Email is not valid"));
    }
    else if (!isLength) {
        res
            .status(400)
            .json((0, generateResponse_1.generateResponse)(true, 400, "Bad Request", "Password should be at least 6 characters"));
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
            res
                .status(401)
                .json((0, generateResponse_1.generateResponse)(true, 401, "Unauthorized", "User already exists"));
        }
        else {
            const user = await prisma.users.create({ data });
            if (user) {
                const token = createToken(user.id);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                res
                    .status(201)
                    .json((0, generateResponse_1.generateResponse)(false, 201, "Success", "User created successfully"));
            }
        }
    }
};
exports.signup_post = signup_post;
async function login_post(req, res) {
    const isEmail = validator_1.default.isEmail(req.body.email);
    const isLength = validator_1.default.isLength(req.body.password, { min: 6, max: undefined });
    if (!isEmail) {
        res
            .status(400)
            .json((0, generateResponse_1.generateResponse)(true, 400, "Bad Request", "Email is not valid"));
    }
    else if (!isLength) {
        res
            .status(400)
            .json((0, generateResponse_1.generateResponse)(true, 400, "Bad Request", "Password should be at least 6 characters"));
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
            res
                .status(200)
                .json((0, generateResponse_1.generateResponse)(false, 200, "Success", "User logged in successfully"));
        }
        else {
            res
                .status(401)
                .json((0, generateResponse_1.generateResponse)(true, 401, "Unauthorized", "Authentication Failure User not registered or check your Email and Password"));
        }
    }
}
exports.login_post = login_post;
function handleError(error) {
    // throw new Error("Function not implemented.");
    console.log("Handling error" + error.message + ": errror message" + error.code);
}
