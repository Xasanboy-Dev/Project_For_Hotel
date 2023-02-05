import { PrismaClient } from '@prisma/client'
import { LoginByEmail } from '../Database/database.service'
const prisma = new PrismaClient()

export async function CheckingUserValid(req: any, res: any, next: any) {
    const email = req!.body.message.email
    const FindeUserByEmail = await prisma.user.findMany({
        where: { email: email },
    })
    if (!FindeUserByEmail[0]) {
        return next()
    }
    res.status(200).json({
        message: `Your email or password isn't valid!`,
    })
    return
}

export async function LoginUserByEmail(req: any, res: any, next: any) {
    try {
        const { email, password } = req.body.message
        const UserBoolean = await LoginByEmail(email, password)
        if (UserBoolean) {
            next()
        } else {
            res.status(201).json({
                message: 'You have some probems. Please check and try again!',
            })
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}
