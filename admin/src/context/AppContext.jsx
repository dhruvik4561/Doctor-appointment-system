import { createContext, useState } from "react"
import React from 'react'

// Creating Context
export const AppContext = createContext()

// AppContext Provider
const AppContextProvider = ({ children }) => {
    const [someState, setSomeState] = useState('')

    return (
        <AppContext.Provider value={{ someState, setSomeState }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
