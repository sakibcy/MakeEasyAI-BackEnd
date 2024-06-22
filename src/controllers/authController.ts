import { PrismaClient } from "../../node_modules/.prisma/client";
const validator = require("validator");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export const signup_post = async (req: any, res: any) => {
    const isEmail = validator.isEmail(req.body.email);
    const isLength = validator.isLength(req.body.password, { min: 6, max: undefined });

    const salt = await bcrypt.genSalt();

    if (!isEmail) {
        res.status(400).json({
            "status": {
                error: true,
                code: 400,
                type: "Bad Request",
                message: "Email is not valid"
            }
        });
    } else if (!isLength) {
        res.status(400).json({
            "status": {
                error: true,
                code: 400,
                type: "Bad Request",
                message: "Password should be at least 6 characters"
            }
        });
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
            res.json({
                "status": {
                    error: true,
                    code: 401,
                    type: "Unauthorized",
                    message: "User already exists"
                }
            });
        } else {
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
}

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

export async function login_post(req: any, res: any) {
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
    } else if (!isLength) {
        res.status(400).json({
            "status": {
                error: true,
                code: 400,
                type: "Bad Request",
                message: "Password should be at least 6 characters"
            }
        });
    } else {
        const user = await prisma.users.findUnique({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        })

        if (user) {
            res.json({
                "status": {
                    error: false,
                    code: 200,
                    type: "success",
                    message: "User logged in successfully"
                }
            });
        } else {
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

function handleError(error: any) {
    // throw new Error("Function not implemented.");
    console.log("Handling error" + error.message + ": errror message" + error.code);
    
}
