import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../redux/reducers/products_reducer'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  REMOVE_PRODUCT,
} from '../redux/actions/action'
import { ProductDataType, SingleProductDataType } from '../types'
import { api, apiWithHeader } from '../utils/api'

export type initialStateType = {
  isSidebarOpen: boolean
  allProducts: ProductDataType[] | []
  featuredProducts: ProductDataType[] | []
  singleProduct: SingleProductDataType
  openSidebar: () => void
  closeSidebar: () => void
  fetchSingleProduct: (id: string) => void
  removeProduct: (id: string) => void
  productsLoading: boolean
  productsError: boolean
  singleProductLoading: boolean
  singleProductError: boolean
  udpateProductDetails:(arg:object) =>void
  fetchProducts:()=>void

}

const initialState: initialStateType = {
  isSidebarOpen: false,
  allProducts: [],
  featuredProducts: [],
  singleProduct: {
    id: "",
    name: "",
    categories: "",
    price: 0,
    images: [],
    slug:"",
    description:"",
    sizes: ""
  },
  openSidebar: () => {},
  closeSidebar: () => {},
  fetchSingleProduct: (id: string) => {},
  productsLoading: false,
  productsError: false,
  singleProductLoading: false,
  singleProductError: false,
  removeProduct: (id: string) => {},
  udpateProductDetails:(arg:object) =>{},
  fetchProducts:()=>{}
}

const ProductsContext = React.createContext<initialStateType>(initialState)

type productProps = {
  children: React.ReactNode // children prop typr
}

export const ProductsProvider: React.FC<productProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }
  const removeProduct = (id: string) => {
    const newProducts: ProductDataType = state.allProducts.filter(
      (product: ProductDataType) => product.id !== id
    )
    dispatch({ type: REMOVE_PRODUCT, payload: newProducts })
  }

  const fetchSingleProduct = (id: string) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const singleProduct: ProductDataType = state.allProducts.filter(
        (product: ProductDataType) => product.id == id
      )[0]
      if (singleProduct) {
        dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
      }
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  const udpateProductDetails = (updateProduct:any) =>{
    const product = state.allProducts.find((product:any) => product.id === updateProduct.id)
    const updatedProductList = product ? [updateProduct,
        ...state.allProducts.filter((product:any) => product.id !== updateProduct.id)
      ] : [...state.allProducts,updateProduct ]

      if(updatedProductList) {
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: updatedProductList })
      }

  }
  
    const fetchProducts = async () => {
      dispatch({ type: GET_PRODUCTS_BEGIN })
      try {
        const queryResult = await api.get('/products')
        const result = await queryResult.data
        console.log('result', result)
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: result })
      } catch (error) {
        dispatch({ type: GET_PRODUCTS_ERROR })
      }
    }
   
  

  return (
    <ProductsContext.Provider
      value={{ ...state, fetchSingleProduct, openSidebar, closeSidebar, removeProduct, udpateProductDetails, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  return useContext(ProductsContext)
}
