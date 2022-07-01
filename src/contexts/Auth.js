import React, { createContext, useState } from 'react'
export const authContext = createContext()
function AuthContext ({ children }) {
  const [authenticated, setAuthenticated] = useState(true)
  function toggleIsAuthenticated () {
    setAuthenticated(!authenticated)
  }

  return (
    <>
      <authContext.Provider value={{ authenticated, toggleIsAuthenticated }}>
        {children}
      </authContext.Provider>
    </>
  )
}

export default AuthContext
