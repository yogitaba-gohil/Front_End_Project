import React, { useEffect, useContext, useReducer } from 'react'

import reducer from '../redux/reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS
} from '../redux/actions/action'
import { useProductsContext } from './products_context'
import { ProductDataType } from '../types'

type filtersType = {
  searchTerm: string
  category: string
}

export const defaultFilters: filtersType = {
  searchTerm: '',
  category: 'all'
}

export type initialStateType = {
  filteredProducts: ProductDataType[]
  allProducts: ProductDataType[]
  filters: filtersType
  updateFilters: (e: any) => void
  clearFilters: () => void
}

const initialState: initialStateType = {
  filteredProducts: [],
  allProducts: [],
  filters: defaultFilters,
  updateFilters: () => {},
  clearFilters: () => {}
}

const FilterContext = React.createContext<initialStateType>(initialState)

type filterProps = {
  children: React.ReactNode // children prop typr
}

export const FilterProvider: React.FC<filterProps> = ({ children }) => {
  const { allProducts } = useProductsContext()

  const [state, dispatch] = useReducer(reducer, initialState)

  // to load the full list of product when app starts
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: allProducts })
  }, [allProducts])

  // to sort and filter products when the sort value has changed
  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS })
  }, [allProducts, state.filters])

  const updateFilters = (e: any) => {
    // need to figure out what to do with the event type here
    let name = e.target.name
    let value = e.target.value
    // only checkbox has e.target.checked prop, so only init checked variable here
    let checked

    if (name === 'category') {
      value = e.target.textContent
    }

    dispatch({ type: UPDATE_FILTERS, payload: { name, value, checked } })
  }
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  return (
    <FilterContext.Provider
      value={{
        ...state,
        updateFilters,
        clearFilters
      }}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext)
}
