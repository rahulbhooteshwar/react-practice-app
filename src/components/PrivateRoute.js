import React from 'react'
import { Route, Redirect, useLocation } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const PrivateRoute = ({ children, ...rest }) => {
  const { pathname } = useLocation();
  const { authStatus } = useContext(AuthContext);
  return (
    authStatus
      ? <Route {...rest}>{children}</Route>
      : <Redirect to={`/auth?redirectTo=${pathname}`}
    />
  )
}

export default PrivateRoute
