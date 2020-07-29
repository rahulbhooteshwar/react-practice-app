import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { ThemeContext } from '../context/ThemeContext'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { cart, getCartItemQuantity } = useContext(CartContext)
  const { currentTheme } = useContext(ThemeContext)
  return (
    <div className="row">
      <div className="col-12 col-md-7">
        {
          cart.items.length > 0
            ? <table className={`table ${currentTheme === 'light' ? 'table-striped' : 'table-dark'} table-responsive`}>
              <thead style={{
                display: "table",
                width: "100%",
                position: "absolute",
                background: "grey",
                marginLeft: "-30px"}}>
                <tr >
                <th ></th>
                <th >Product</th>
                <th >Price</th>
                <th >Quantity</th>
                <th >Item Total</th>
              </tr>
              </thead>
            <tbody style={{ marginTop: "30px", display: 'block', maxHeight: '70vh', oveflowY: 'auto' }}>
              {
                cart.items.map((item) => {
                  return <tr key={item.id}>
                    <td>
                      <img height="100" width="100" src={item.image} alt="..." className="img-thumbnail" />
                    </td>
                    <td><h4 className="p-4">{item.name}</h4></td>
                    <td><h4 className="p-4">${item.price}</h4></td>
                    <td><h4 className="p-4">{getCartItemQuantity(item.id)}</h4></td>
                    <td><h4 className="p-4">{(item.price * getCartItemQuantity(item.id)).toFixed(2)}</h4></td>
                  </tr>
                })
              }
            </tbody>
            </table>
            : <Link className="btn btn-outline-success" to="/products">Let's Do Some Shopping First</Link>
        }
      </div>
    <div className="col-12 col-md-5">
      <div className={`card strong ${currentTheme === 'light' ? 'text-dark bg-light' : 'text-white bg-dark'} mb-3 ml-auto mr-auto`} style={{ "maxWidth": "18rem" }}>
        <div className="card-body">
          <h4 className="card-text text-center">Total</h4>
          <h3 className="card-title text-center">${cart.total.toFixed(2)}</h3>
        </div>
      </div>
    </div>

    </div >
  )
}

export default Cart
