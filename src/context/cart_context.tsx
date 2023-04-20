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
  GET_ORDERS_ERROR
} from '../redux/actions/action'

export type cartType = {
  id: string
  slug: string
  name: string
  amount: number
  image: string
  price: number
}
export type orderType ={
  products: [] | any
  userId:string
  createdAt: string
  id:number
}

export type initialStateType = {
  cart: cartType[]
  totalItems: number
  totalAmount: number
  addToCart: (
    id: string | undefined,
    slug: string | undefined,
    amount: number,
    singleProduct: ProductDataType | {}
  ) => void
  removeItem: (id: string) => void
  toggleAmount: (id: string, value: string) => void
  clearCart: () => void
  orders:orderType[]
  addToOrder:(orders:orderType)=>void
  orderLoading:boolean
  ordersError:boolean
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
  orders:[],
  addToOrder:()=>{},
  orderLoading:false,
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
    amount: number,
    singleProduct: ProductDataType | {}
  ) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, slug, amount, singleProduct },
    })
  }

  const removeItem = (id: string) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
  }

  const addToOrder =(orders:orderType) =>{
    const updatedOrderList =  [...state.orders,orders ]
    dispatch({ type: ADD_TO_ORDER, payload:updatedOrderList  })

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
        const queryResult = await fetch('http://localhost:5173/products.json')
        const result = await queryResult.json()
        dispatch({ type: GET_ORDERS_SUCCESS, payload: result.orders })
      } catch (error) {
        dispatch({ type: GET_ORDERS_ERROR })
      }
    }
    fetchOrders()
  }, [])
  // when the cart changes, store the changes to localStorage + re-calculate total amount in cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
    dispatch({type: COUNT_CART_TOTALS})
  }, [state.cart])

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart, addToOrder }}
    >
      {children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}