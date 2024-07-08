import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateResponse } from "../utils/generateResponse";

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const tokenFromHeader = req.headers.authorization?.split(' ')[1];
    const tokenFromCookie = req.cookies.jwt;

    const token = tokenFromHeader || tokenFromCookie;
    if (!token) {
        return res.status(401).json(generateResponse(
            true, 401, "Unauthorized", "You are not authorized to access this"
        ));
    }

    try {
        const decoded = jwt.verify(token, 'the secret stored in env')
        next();
    } catch (error) {
        res.status(401).json(generateResponse(
            true, 401, "Unauthorized", "You are not authorized to access this"
        ));
    }
}