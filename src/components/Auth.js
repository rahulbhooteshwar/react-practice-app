import React, { Fragment, useContext } from "react"
import {AuthContext} from "../context/AuthContext";

const Auth = props => {
  const { login, logout, authStatus } = useContext(AuthContext);
  return (
    <Fragment>
      {
        authStatus
          ? <button className="custom" onClick={logout}>Logout</button>
          : <button className="custom" onClick={login}>Login</button>
      }
    </Fragment>
  )
}

export default Auth;