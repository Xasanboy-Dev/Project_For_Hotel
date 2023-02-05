import { useState } from "react"
import axios from "axios"
import { Link, Navigate } from "react-router-dom"
export default function RegisterPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [lastname, setLastname] = useState("")
    const [redirect, setRedirect] = useState(false)
    function registerUser(ev: any) {
        ev.preventDefault()
        if (name == "" || lastname == "" || email == "" || password == "" || !name || !lastname || !email || !password) {
            alert("You must fill all the gaps!")
            return
        }
        axios.post("/register", { message: { name, password, email, lastname } })
            .then(res => {
                if (res.status == 201) {
                    alert("Registered succesfuly. And you can login now!")
                    setRedirect(true)
                    return
                } else {
                    alert(res.data.message)
                }
            })
    }
    if (redirect) {
        return <Navigate to={"/login"} />
    }
    return (
        <div className="mt-4 grow flex items-center  justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md  mx-auto" onSubmit={registerUser}>
                    <input type="text"
                        onChange={ev => setName(ev.target.value)} value={name} placeholder="John" />
                    <input type="text"
                        onChange={ev => setLastname(ev.target.value)} value={lastname} placeholder="Doe" />
                    <input type="email" value={email}
                        onChange={ev => setEmail(ev.target.value)} placeholder="your@email.com" />
                    <input type="password" value={password}
                        onChange={ev => setPassword(ev.target.value)} placeholder="password" />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-grey-500">Already a member?
                        <Link className="underline text-black-900" to={'/login'}> Login </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}