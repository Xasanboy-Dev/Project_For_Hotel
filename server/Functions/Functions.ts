import {
    RegisterUser,
    GetUsers,
    LoginByEmail,
    getUser,
    removerUser,
} from '../Database/database.service'
import jwt from 'jsonwebtoken'
import { sign } from 'crypto'
import { user } from '@prisma/client'
import dotenv from 'dotenv'
dotenv.config()
const SECRET: string = process.env.SECRET_WORD || 'Hello'
export async function GetAllUsers(req: any, res: any) {
    const Users = await GetUsers()
    res.status(200).json({ message: 'All Users', Users })
}

export async function postRegister(req: any, res: any) {
    try {
        const { name, email, password, lastname } = req.body.message
        const CreatedUser = await RegisterUser(name, lastname, email, password)
        res.status(201).json({ message: 'Created User', CreatedUser })
    } catch (error: any) {
        res.status(500).json({
            message: 'Error in postig Register',
        })
    }
}

export async function LoginUser(req: any, res: any) {
    try {
        const { email } = req.body.message
        const _user: user = (await getUser(email))!
        jwt.sign({ _user }, SECRET, {}, (err, token) => {
            if (err) throw err
            res.status(200).json({
                message: 'Success login',
                user: {
                    id: _user.id,
                    name: _user.name,
                    email: _user.email,
                },
                token: token,
            })
        })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function DeleteUserById(req: any, res: any) {
    try {
        const id: number = +req.params.id

        res.status(200).json({
            message: 'Deleted',
            user: await removerUser(id),
        })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function GetUserData(req: any, res: any) {
    try {
        const auth = req.headers.authorization
        const _user = jwt.verify(auth, process.env.SECRET_WORD || 'SECRET')
        res.status(200).json({ user: _user })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}
