import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({ children }: any) {
    const [user, setUser] = useState(null)
    const [ready, setReady] = useState(false)
    useEffect(() => {
        if (!user) {
            axios.get("profile", {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
                .then(res => {
                    setUser(res.data.user)
                    setReady(true)
                })
        }
    }, [])
    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    )
}