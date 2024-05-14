import { PrismaClient } from "../../node_modules/.prisma/client";

const prisma = new PrismaClient();

export const signup_post = async (req: any, res: any) => {
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
    } else {
        const user = await prisma.users.create({ data });
        if (user) {
            res.json({
                "status": {
                    error: false,
                    code: 200,
                    type: "success",
                    message: "User created successfully"
                }
            });
        }
    }
}

export async function login_post(req: any, res: any) {
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
        res.json({
            "status": {
                error: true,
                code: 401,
                type: "Unauthorized",
                message: "Authentication Failure User not registered or check your Email and Password"
         }
        });
    }
}