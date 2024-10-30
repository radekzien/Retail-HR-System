import { PayslipContext } from "../contexts/payslipContext";
import { useContext } from "react";

export const usePayslipsContext = () => {
    const context = useContext(PayslipContext)

    if(!context){
        throw Error('payslipContext must be used inside a PayslipsContextProvider')
    }
    return context
}