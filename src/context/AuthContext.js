import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
export const AuthContext = React.createContext({ status: false, login: () => { }, logout: () => { } });

export const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(false);
  const history = useHistory()
  const login = () => {
    setAuthStatus(true)
    history.push('/products')
  }
  const logout = () => {
    setAuthStatus(false)
  }
  return <AuthContext.Provider value={{ login, logout, authStatus }}>{children}</AuthContext.Provider>
}