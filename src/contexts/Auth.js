import React, { createContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
export const authContext = createContext()
function AuthContext ({ children }) {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  function toggleIsAuthenticated () {
    console.log('toggle');
    setAuthenticated(!authenticated)
  }
  function setTokenHandle(token){
    setToken(token);
    history.push('/profile')

  }
  function logout(){
    setAuthenticated(false);
    setToken('')
  }

  return (
    <>
      <authContext.Provider value={{ authenticated, toggleIsAuthenticated, setTokenHandle, logout, token }}>
        {children}
      </authContext.Provider>
    </>
  )
}

export default AuthContext
