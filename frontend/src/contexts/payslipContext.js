import { createContext, useReducer } from "react";

export const payslipReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WEEKLY':
            return {
                ...state,
                payslips: action.payload
            };
        case 'CREATE_WEEKLY':
            return {
                ...state,
                payslips: [action.payload, ...state.payslips]
            };
        default:
            return state;
    }
};


export const PayslipContext = createContext();


export const PayslipContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(payslipReducer, {
        payslips: []  
    });

    return (
        <PayslipContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PayslipContext.Provider>
    );
};