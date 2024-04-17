import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export  default async function db() {
    const user = await prisma.user.create({ data: { name: 'DEMO', email: 'demo4@prisma.com'}})
    console.log(user)
    console.log(user)
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)}

// db()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.error(e)
//         await prisma.$disconnect()
//         process.exit(1)
//     })