import axios from "axios"
import { useEffect } from "react"
export default function IndexPage() {

    useEffect(() => {
        axios.get('http://localhost:8080/profile', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => (res.data.user))

    }, [])

    return (
        <div>
            index page here
        </div>
    )
}