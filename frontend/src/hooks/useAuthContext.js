import { authContext } from "../contexts/authContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(authContext)

    if(!context){
        throw Error('authContext must be used inside a AuthContextProvider')
    }
    return context
}