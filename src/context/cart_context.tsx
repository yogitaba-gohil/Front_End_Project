import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../redux/reducers/cart_reducer'
import { ProductDataType } from '../types'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  ADD_TO_ORDER,
  GET_ALL_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR,
  REMOVE_ORDER
} from '../redux/actions/action'
import { api } from '../utils/api'

export type cartType = {
  id: string
  slug: string
  name: string
  image: string
  price: number
  variant: string
  quantity: number
  sizes: string
}
export type orderType = {
  user: {
    id: string
  }
  orderDetails: string
  paymentType: string
  shippingAddress: string
  shippingMethod: string
  shippingFee: number
  total: number
}

export type initialStateType = {
  cart: cartType[]
  totalItems: number
  totalAmount: number
  addToCart: (
    id: string | undefined,
    slug: string | undefined,
    quantity: number,
    singleProduct: ProductDataType | {}
  ) => void
  removeItem: (id: string) => void
  toggleAmount: (id: string, value: string) => void
  clearCart: () => void
  orders: orderType[]
  addToOrder: (orders: orderType) => void
  deleteOrder:(id:string) => void
  orderLoading: boolean
  ordersError: boolean
}

const getLocalStorage: () => [] | cartType[] = () => {
  let cart = localStorage.getItem('cart')
  if (cart) {
    return JSON.parse(cart)
  } else {
    return []
  }
}

const initialState = {
  cart: getLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  addToCart: () => {},
  removeItem: () => {},
  toggleAmount: () => {},
  clearCart: () => {},
  orders: [],
  addToOrder: () => {},
  deleteOrder:() =>{},
  orderLoading: false,
  ordersError: false
}

const CartContext = React.createContext<initialStateType>(initialState)

type cartProps = {
  children: React.ReactNode // children prop typr
}

export const CartProvider: React.FC<cartProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCart = (
    id: string | undefined,
    slug: string | undefined,
    quantity: number,
    singleProduct: ProductDataType | {}
  ) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, slug, quantity, singleProduct }
    })
  }

  const removeItem = (id: string) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
  }
const deleteOrder = async (id: string)=>{
  const response = await api.delete(`/orders/${id}`)

  if (response.status === 200) {
    const updatedOrderList = await api.get('/orders')
    dispatch({ type: REMOVE_ORDER, payload: updatedOrderList.data })
  }
 

}
  const addToOrder = async (orders: orderType) => {
    const response = await api.post('/orders', orders)

    if (response.status === 200) {
      const updatedOrderList = await api.get('/orders')
      dispatch({ type: ADD_TO_ORDER, payload: updatedOrderList })
    }
  }

  const toggleAmount = (id: string, value: string) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } })
  }

  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }
  useEffect(() => {
    const fetchOrders = async () => {
      dispatch({ type: GET_ALL_ORDERS })
      try {
        const queryResult =  await api.get('/orders')
        const result = await queryResult.data
        dispatch({ type: GET_ORDERS_SUCCESS, payload: result })
      } catch (error) {
        dispatch({ type: GET_ORDERS_ERROR })
      }
    }
    fetchOrders()
  }, [])
  // when the cart changes, store the changes to localStorage + re-calculate total amount in cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
    dispatch({ type: COUNT_CART_TOTALS })
  }, [state.cart])

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart, addToOrder, deleteOrder }}>
      {children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
