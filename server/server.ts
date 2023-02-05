import express from 'express'
import dotenv from 'dotenv'
import {
    postRegister,
    GetAllUsers,
    LoginUser,
    DeleteUserById,
    GetUserData,
} from './Functions/Functions'
import { LoginUserByEmail } from './MiddleWares/CheckingUser'
import { CheckingUserValid } from './MiddleWares/CheckingUser'
import cors from 'cors'
dotenv.config()
const server = express()
const PORT = process.env.PORT
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(
    cors({
        origin: true,
        credentials: true,
    })
)
server.get('/', GetAllUsers)

server.post('/register', CheckingUserValid, postRegister)

server.post('/login', LoginUserByEmail, LoginUser)

server.get('/profile', GetUserData)
server.delete('/user/:id', DeleteUserById)
server.listen(PORT, () => {
    console.log(`SERVER: http://localhost:${PORT}`)
})
