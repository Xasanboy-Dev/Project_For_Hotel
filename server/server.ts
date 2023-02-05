import express from 'express'
import { postRegister, GetAllUsers, LoginUser } from './Functions/Functions'
import { LoginUserByEmail } from './MiddleWares/CheckingUser'
import { CheckingUserValid } from './MiddleWares/CheckingUser'
import cors from 'cors'
const server = express()
const PORT = 8080
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
)
server.get('/', GetAllUsers)

server.post('/register', CheckingUserValid, postRegister)

server.post('/login', LoginUserByEmail, LoginUser)

server.listen(PORT, () => {
    console.log(`SERVER: http://localhost:${PORT}`)
})
