import {
    RegisterUser,
    GetUsers,
    LoginByEmail,
    getUser,
} from '../Database/database.service'
import jwt from 'jsonwebtoken'
import { sign } from 'crypto'
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
        const User = await getUser(email)
        jwt.sign(
            { email: User!.email, id: User!.id },
            'SECRET',
            {},
            (err, token) => {
                if (err) throw err
                res.status(200).cookie(token).json({
                    message: 'Login Suucesfully',
                })
            }
        )
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}
