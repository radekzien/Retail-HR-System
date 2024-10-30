import { ShiftsContext } from "../contexts/shiftsContext";
import { useContext } from "react";

export const useShiftsContext = () => {
    const context = useContext(ShiftsContext)

    if(!context){
        throw Error('shiftsContext must be used inside a ShiftsContextProvider')
    }
    return context
}