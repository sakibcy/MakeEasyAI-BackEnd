import { PrismaClient } from "../../node_modules/.prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { generateResponse } from "../utils/generateResponse";
import { JWT_TOKEN_NAME, SALT_ROUND_DB } from "../config";

const prisma = new PrismaClient();

const maxAge = 3 * 24 * 60 * 60; // 3 days

const createToken = (id: any) => {
    return jwt.sign({ id }, 'the secret stored in env', {
        expiresIn: maxAge
    });
}

export const signupPost = async (req: Request, res: Response) => {
    const isEmail = validator.isEmail(req.body.email);
    const isLength = validator.isLength(req.body.password, { min: 6, max: undefined });

    const salt = await bcrypt.genSalt(SALT_ROUND_DB);

    if (!isEmail) {
        return res.status(400).json(generateResponse(
            true, 400, "Bad Request", "Email is not valid"
        ));
    } else if (!isLength) {
        return res.status(400).json(generateResponse(
            true, 400, "Bad Request", "Password should be at least 6 characters"
        ));
    } else {
        const password = await bcrypt.hash(req.body.password, salt)

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
            return res.status(401).json(generateResponse(
                true, 401, "Unauthorized", "User already exists"
            ));
        } else {
            const user = await prisma.users.create({ data });
            if (user) {
                const token = createToken(user.id);
                res.setHeader(JWT_TOKEN_NAME, token).cookie(JWT_TOKEN_NAME, token, { httpOnly: true, maxAge: maxAge * 1000 });

                return res.status(201).json(generateResponse(
                    false, 201, "Success", "User created successfully"
                ));
            }
        }
    }
}

export async function loginPost(req: Request, res: Response) {
    const isEmail = validator.isEmail(req.body.email);
    const isLength = validator.isLength(req.body.password, { min: 6, max: undefined });

    const user = await prisma.users.findUnique({
        where: {
            email: req.body.email
        }
    })

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = createToken(user.id);
        res.setHeader(JWT_TOKEN_NAME, token).cookie(JWT_TOKEN_NAME, token, { httpOnly: true, maxAge: maxAge * 1000 });

        return res.status(200).json(generateResponse(
            false, 200, "Success", "User logged in successfully"
        ));
    } else if (user && !bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json(generateResponse(
            true, 401, "Unauthorized", "Password is incorrect"
        ));
    } else {
        return res.status(401).json(generateResponse(
            true, 401, "Unauthorized", "Email is invalid"
        ));
    }

}

function handleError(error: any) {
    // throw new Error("Function not implemented.");
    console.log("Handling error" + error.message + ": errror message" + error.code);

}
