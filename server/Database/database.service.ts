import { PrismaClient } from '@prisma/client'
import bc from 'bcrypt'
const prisma = new PrismaClient()

export async function GetUsers() {
    const Users = await prisma.user.findMany()
    return Users
}

export async function RegisterUser(
    name: string,
    lastname: string,
    email: string,
    password: string
) {
    password = bc.hashSync(password.toString(), 8)
    let User = { name, email, password, lastname }
    let Created = prisma.user.create({
        data: User,
    })
    return await Created
}

export async function LoginByEmail(email: string, password: string) {
    try {
        const SelectedUser = await prisma.user.findUnique({
            where: { email: email },
        })
        if (!SelectedUser) {
            return false
        }
        if (bc.compareSync(password, SelectedUser.password)) {
            return true
        }
        return false
    } catch (error: any) {
        console.log(error.message)
    }
}

export async function removerUser(id: number) {
    return await prisma.user.delete({ where: { id } })
}

export async function getUser(email: string) {
    return await prisma.user.findUnique({ where: { email: email } })
}
