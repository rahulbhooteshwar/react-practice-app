import React from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
export const AuthContext = React.createContext({ status: false, login: () => { }, logout: () => { } });

export const AuthProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(false);
  const history = useHistory()
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const login = () => {
    setAuthStatus(true)
    if (query.get('redirectTo')) {
      history.push(query.get('redirectTo'))
    } else {
      history.push('/products')
    }
  }
  const logout = () => {
    setAuthStatus(false)
  }
  return <AuthContext.Provider value={{ login, logout, authStatus }}>{children}</AuthContext.Provider>
}