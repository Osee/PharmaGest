import React, { createContext, useReducer } from "react"
import AuthReducer from "../Domain/Auth/Reducer/AuthReducer"
import AuthInistialState from "../Domain/Auth/State/AuthInitialState"
import userReducer from "../Domain/User/Reducer/userReducer"
import userInitialState from "../Domain/User/State/userInitialState"
import ErrorReducer from "./Reducer/ErrorReducer"
import { errorInitialState, initError } from "./State/errorInitialState"


export const GlobalContext = createContext({})

export const GlobalContextProvider = ({ children }) => {
    const [authState, dispatchAuth] = useReducer(AuthReducer, AuthInistialState)
    const [userState, dispatchUser] = useReducer(userReducer, userInitialState)
    const [errorState, dispatchError] = useReducer(ErrorReducer, errorInitialState, initError)
    return <GlobalContext.Provider value={
        {
            authState,
            dispatchAuth,
            userState,
            dispatchUser,
            errorState,
            dispatchError
        }
    }>
        {children}
    </GlobalContext.Provider>
}