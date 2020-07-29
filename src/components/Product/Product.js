import React from 'react'
import './Product.scss'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

const Product = ({ id, name, image, price }) => {
  const { dispatchCartAction, getCartItemQuantity } = useContext(CartContext)
  return (

    <div className="offer offer-radius offer-primary">
      <div className="shape">
        <div className="shape-text">
          {getCartItemQuantity(id)}
        </div>
      </div>
      <div className="offer-content">
        <div className="row p-2">
          <div className="col-12 col-md-6 col-lg-4">
            <img src={image} alt="..." className="img-thumbnail" />
          </div>
          <div className="col-12 col-md-6 col-lg-8">
            <h3 className="lead">
              {name}
            </h3>
            <div className="text-primary">
              <h2>${price}</h2>
            </div>
            {
              getCartItemQuantity(id) > 0
                ? <div className="btn-group float-right">
                  <button onClick={() => dispatchCartAction({ type: 'REMOVE_ITEM', payload: { id } })} className="btn btn-outline-danger" title="Remove 1">-</button>
                  <button onClick={() => dispatchCartAction({ type: 'ADD_ITEM', payload: { id } })} className="btn btn-outline-success" title="Add 1">+</button>
                </div>
                : <button onClick={() => dispatchCartAction({ type: 'ADD_ITEM', payload: { id, name, image, price } })} className="custom">Add To Cart</button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
