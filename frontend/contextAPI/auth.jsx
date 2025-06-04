import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie"

const authContext = createContext()

const api_link = import.meta.env.VITE_API_BASE_URL

export const AuthProvider =({children})=> {

    const [loading, setLoading] = useState(true)
    const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"))

    const [loggedInUser, setLoggedInUser] = useState()
    const authorizationToken = `Bearer ${accessToken}`
    const isLoggedIn = !!accessToken

    const storeAccessToken =(storeToken)=> {
        setAccessToken(storeToken)
        return Cookies.set("accessToken", storeToken)
    }

    const getUserData =async()=> {
        setLoading(true)
        const response = await fetch(`${api_link}/loggedin_user`, {
            method: "GET", 
            headers: {
                Authorization: authorizationToken
            }
        })
        if(response.ok){
            const res_user = await response.json()
            //console.log(res_user.data)
            setLoggedInUser(res_user.data)
            setLoading(false)
        }
    }

    const loggout =async()=>{
        const response = await fetch(`${api_link}/logout`, {
            method: "POST",
            headers: {
                Authorization: authorizationToken
            }
        })
        if(response.ok){
            setAccessToken("")
            Cookies.remove("accessToken")
        }
    }

    useEffect(()=>{
        getUserData()
    },[])

    return <authContext.Provider value={{storeAccessToken, getUserData, loggout, loading, loggedInUser, isLoggedIn}}>{children}</authContext.Provider>
}

export const useAuth =()=>{
    const authValue = useContext(authContext)
    return authValue;
}
