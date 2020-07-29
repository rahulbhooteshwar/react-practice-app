import React from 'react'
import { Route, Redirect } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const PrivateRoute = ({ children, ...rest }) => {
  const { authStatus } = useContext(AuthContext);
  return (
    authStatus ? <Route {...rest}>{children}</Route> : <Redirect to='/auth'/>
  )
}

export default PrivateRoute
