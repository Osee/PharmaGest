import React, { createContext, useReducer } from "react"
import AuthReducer from "../Domain/Auth/Reducer/AuthReducer"
import AuthInistialState from "../Domain/Auth/State/AuthInitialState"


export const GlobalContext = createContext({})

export const GlobalContextProvider = ({ children }) => {
    const [authState, dispatchAuth] = useReducer(AuthReducer, AuthInistialState)
    return <GlobalContext.Provider value={
        {
            authState,
            dispatchAuth
        }
    }>
        {children}
    </GlobalContext.Provider>
}