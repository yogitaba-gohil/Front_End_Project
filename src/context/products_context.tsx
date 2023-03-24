import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../redux/reducers/products_reducer'
import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR
} from '../redux/actions/action'
import { productDataType } from '../utils/productData'

export type initialStateType = {
  
  allProducts: productDataType[] | []
  productsLoading: boolean
  productsError: boolean
}

const initialState: initialStateType = {
  allProducts: [],
  productsLoading: false,
  productsError: false,
}

const ProductsContext = React.createContext<initialStateType>(initialState)

type productProps = {
  children: React.ReactNode // children prop typr
}

export const ProductsProvider: React.FC<productProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: GET_PRODUCTS_BEGIN })
      try {
        const queryResult = await fetch('http://localhost:5173/products.json')
        const result = await queryResult.json()
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: result.data })
      } catch (error) {
        console.log(error)
        dispatch({ type: GET_PRODUCTS_ERROR })
      }
    }
    fetchProducts()
  }, [])

  return <ProductsContext.Provider value={{ ...state }}>{children}</ProductsContext.Provider>
}

export const useProductsContext = () => {
  return useContext(ProductsContext)
}
