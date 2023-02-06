import { useContext } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { UserContext } from "../UserContext"
import PlacePage from "./PlacesPage"

export default function Account() {
    if (localStorage.getItem("token") == "") {
        window.location.href = '/login'
        return
    }
    function logout() {
        localStorage.setItem("token", "")
        window.location.href = "/login"
    }

    const user: any = useContext(UserContext)
    let name = user?.user?._user?.name
    let email = user?.user?._user?.email
    let { subpage } = useParams()
    if (!subpage) {
        subpage = "profile"
    }
    const ready: any = useContext(UserContext)
    if (!ready) {
        return <h1>"Loading...."</h1>
    }
    if (ready && !user) {
        return <Navigate to={"/login"} />
    }
    function linkClasses(type: any) {
        let classes = "py-2 px-6 inline-flex gap-1"
        if (type === subpage) {
            classes += " bg-primary text-white rounded-full"
        } else {
            classes+=" bg-gray-200 text-white rounded-full"
        }
        return classes
    }
    return (
        <div>
            <nav className="w-full flex mt-8 gap-2 mb-8 justify-center">
                <Link className={linkClasses("profile")} to={"/account/profile"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                    My Profile
                </Link>
                <Link className={linkClasses("bookings")} to={"/account/bookings"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>
                    My Bookings
                </Link>
                <Link className={linkClasses("places")} to={"/account/places"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
                        <path fillRule="evenodd" d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z" clipRule="evenodd" />
                    </svg>
                    My accommodations
                </Link>
            </nav>
            {subpage == "profile" && (
                <div className="text-center max-w-lg mt-5 mx-auto">
                    Logged in as {name} ({email}) <br />
                    <button onClick={() => logout()} className="primary">Logout</button>
                </div>
            )}
            {subpage == "places" && (
                <PlacePage />
            )}
        </div>
    )
}