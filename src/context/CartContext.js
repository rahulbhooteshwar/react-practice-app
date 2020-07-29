import React from 'react'
import { useReducer } from 'react'
export const CartContext = React.createContext()

const getCartTotal = (cart) => {
  return cart.items.reduce((total, item) => {
    return total + (item.quantity * item.price)
  }, 0)
}
const getCartItemCount = (cart) => {
  return cart.items.reduce((count, item) => {
    return count + item.quantity
  }, 0)
}
const cartReducer = (state, { type, payload }) => {
  console.log(state, type, payload)
  switch (type) {
    case 'ADD_ITEM':
      {
        const cartItem = state.items.find(item => item.id === payload.id)
        if (cartItem) {
          // item already in cart, so increment quantity
          cartItem.quantity = cartItem.quantity + 1
        } else {
          // item added first time
          payload.quantity = 1
          // add to cart
          state.items.unshift(payload)
        }
        state.total = getCartTotal(state)
        state.count = getCartItemCount(state)
        // we need to change state object to trigger change
        return { ...state }
      }
    case 'REMOVE_ITEM':
      {
        const cartItem = state.items.find(item => item.id === payload.id)
        if (cartItem) {
          if (cartItem.quantity > 1) {
            cartItem.quantity = cartItem.quantity - 1
          } else {
            // remove the item at all
            state.items = state.items.filter(item => item.id !== cartItem.id)
          }
        }
        state.total = getCartTotal(state)
        state.count = getCartItemCount(state)
        // we need to change state object to trigger change
        return { ...state }
      }
    default:
      return state
  }
}
export const CartProvider = ({ children }) => {
  const [ cart, dispatchCartAction ] = useReducer(cartReducer, { items: [], total: 0, count: 0 })
  const getCartItemQuantity = (id) => {
    const cartItem = cart.items.find(item => item.id === id)
    if (cartItem) {
      return cartItem.quantity
    } else {
      return 0
    }
  }
  return <CartContext.Provider value={{ cart, dispatchCartAction, getCartItemQuantity }}>{children}</CartContext.Provider>
}