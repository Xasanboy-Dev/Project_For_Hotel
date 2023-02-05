import { Link, Navigate } from "react-router-dom"
import { useContext, useState } from "react"
import axios from "axios"
import { UserContext } from "../UserContext"
export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const all: any = useContext(UserContext)
    const setUser = all.setUser
    async function SubmitedLoginForm(ev: any) {
        ev.preventDefault()
        if (!email || !password) {
            alert("Please fill all the gaps!")
            return
        }
        let UserInfo: any
        axios.post('/login', { message: { email, password } })
            .then(res => {
                UserInfo = res.data.user
                setUser(UserInfo)
                if (res.status !== 200) {
                    alert(res.data.message)
                    return
                }
                console.log(res.data.message)
                localStorage.setItem('token', res.data.token)
                if (res.status == 200) {
                    setRedirect(true)
                }
            })
            .catch(e => {
                console.log(e.message)
            })
    }

    if (redirect) {
        return <Navigate to={"/"} />
    }

    return (
        <div className="mt-4 grow flex items-center  justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form onSubmit={SubmitedLoginForm} className="max-w-md  mx-auto">
                    <input type="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email} placeholder="your@email.com" />
                    <input type="password"
                        value={password} placeholder="password"
                        onChange={e => setPassword(e.target.value)} />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-grey-500">Don't have an account yet?
                        <Link className="underline text-black-900" to={'/register'}> Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}