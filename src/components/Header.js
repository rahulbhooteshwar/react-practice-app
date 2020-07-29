import React, { Fragment, useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import LocaleSelector from "./LocaleSelector";
import ThemeSelector from "./ThemeSelector";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Auth from "./Auth";

const Header = () => {
  const { authStatus } = useContext(AuthContext)
  const { cart } = useContext(CartContext)
  return (
    <Fragment>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <div style={{ float: 'right', 'marginRight': '10px', display: 'inline-block' }}>
          <ThemeSelector></ThemeSelector>
          <LocaleSelector></LocaleSelector>
        </div>
        {
          authStatus ?
            <Fragment>
              <Link to='/'>Fun</Link>
              |<Link to='/todo'>ToDo</Link>
              |<Link to='/products'>Shop</Link>
              |<Link to='/cart'>Your Cart({cart.count})</Link>|
            </Fragment>
            : ''
        }
        <Auth />
        <hr />
      </div>
    </Fragment>
  )
}

export default Header;