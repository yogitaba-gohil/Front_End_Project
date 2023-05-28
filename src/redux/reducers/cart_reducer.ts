import {
  ADD_TO_CART,
  ADD_TO_ORDER,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  GET_ORDERS_SUCCESS,
  GET_ALL_ORDERS,
  GET_ORDERS_ERROR
} from '../actions/action'
import { initialStateType, cartType } from '../../context/cart_context'

const cart_reducer = (state: initialStateType, action: { type: any; payload?: any }) => {
  if (action.type === ADD_TO_CART) {
    console.log('action.payload', action.payload)
    const { id, slug, quantity, singleProduct } = action.payload
    const tempItem = state.cart.find((item) => item.id === id)

    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id) {
          const newAmount = tempItem.quantity + quantity
          return { ...cartItem, quantity: newAmount }
        } else {
          return cartItem
        }
      })

      return { ...state, cart: tempCart }
    } else {
      const newItem: cartType = {
        id,
        slug,
        name: singleProduct.name,
        quantity,
        image: singleProduct.images[0],
        price: singleProduct.price,
        variant: singleProduct.variant,
        sizes:singleProduct.sizes

      }
      return { ...state, cart: [...state.cart, newItem] }
    }
  }
  if(action.type ===GET_ALL_ORDERS ){
    return { ...state, orderLoading: true }

  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }
  if(action.type === GET_ORDERS_SUCCESS){
    return {...state, orders: action.payload}
  }
  if(action.type === GET_ORDERS_ERROR){
    return { ...state, ordersError: true, orderLoading: false }

  }
  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((cartItem) => cartItem.id !== action.payload)
    return { ...state, cart: tempCart }
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload
    const tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === id) {
        if (value === 'inc') {
          return { ...cartItem, quantity: cartItem.quantity + 1 }
        } else {
          let tempAmount = cartItem.quantity - 1
          if (tempAmount < 1) {
            tempAmount = 1
          }
          return { ...cartItem, quantity: tempAmount }
        }
      } else {
        return cartItem
      }
    })

    return { ...state, cart: tempCart }
  }
  if (action.type == ADD_TO_ORDER) {
    return { ...state, orders: action.payload }
  }
  if (action.type === COUNT_CART_TOTALS) {
    const { totalItems, totalAmount } = state.cart.reduce(
      (total, cartItem) => {
        const { price, quantity } = cartItem

        total.totalItems += quantity
        total.totalAmount += quantity * price

        return total
      },
      { totalItems: 0, totalAmount: 0 }
    )
    return { ...state, totalItems, totalAmount }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
