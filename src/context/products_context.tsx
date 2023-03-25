import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../redux/reducers/products_reducer'
import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR
} from '../redux/actions/action'
import { productDataType } from '../utils/productData'

export type initialStateType = {
  
  allProducts: productDataType[] | []
  featuredProducts: productDataType[] | []
  singleProduct: productDataType | {}
  fetchSingleProduct: (id: string) => void
  productsLoading: boolean
  productsError: boolean
  singleProductLoading: boolean
  singleProductError: boolean
}

const initialState: initialStateType = {

  allProducts: [],
  featuredProducts: [],
  singleProduct: {},
  fetchSingleProduct: (id: string) => {},
  productsLoading: false,
  productsError: false,
  singleProductLoading: false,
  singleProductError: false,
}

const ProductsContext = React.createContext<initialStateType>(initialState)

type productProps = {
  children: React.ReactNode // children prop typr
}

export const ProductsProvider: React.FC<productProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchSingleProduct = (slug: string) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const singleProduct: productDataType = state.allProducts.filter(
        (product: productDataType) => product.slug === slug
      )[0]
      // running filter() on empty allProducts [] will result in undefined
      // this if clause guard against such case
      if (singleProduct) {
        dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

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

  return <ProductsContext.Provider value={{ ...state, fetchSingleProduct }}>{children}</ProductsContext.Provider>
}

export const useProductsContext = () => {
  return useContext(ProductsContext)
}

