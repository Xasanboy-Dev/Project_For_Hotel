import axios from "axios"
export default function () {
    const user: any = axios.get("/profile", {
        headers: {
            "Authorization": localStorage.getItem('token')
        }
    })
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}