import { createContext, useReducer } from "react";

export const shiftsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SHIFTS':
            return {
                ...state,
                shifts: action.payload
            };
        case 'CREATE_SHIFT':
            return {
                ...state,
                shifts: [action.payload, ...state.shifts]
            };
        case 'DELETE_SHIFT':
            return {
                ...state,
                shifts: state.shifts.filter((s) => s._id !== action.payload._id)
            };
        default:
            return state; 
    }
};

export const ShiftsContext = createContext();

export const ShiftsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(shiftsReducer, {
        shifts: [] 
    });

    return (
        <ShiftsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ShiftsContext.Provider>
    );
};