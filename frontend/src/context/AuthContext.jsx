import React, { Children, createContext, useState } from 'react'

export const authDataContext = createContext()

function AuthCotext({children}) {
    let serverUrl = "https://quickstay-backend1.onrender.com"
    let [loading, setLoading] = useState(false)

   let value={
        serverUrl,
        loading, setLoading
    }
  return (
    <div>
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    </div>
  )
}

export default AuthCotext
