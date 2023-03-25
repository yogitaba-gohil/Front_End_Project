import {
    LOAD_PRODUCTS,
    SET_LIST_VIEW,
    SET_GRID_VIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
    HANDLE_CLICK_FROM_SERVICES,
    RESET_IS_CLICK_FROM_SERVICES,
  } from '../../redux/actions/action'
  import { initialStateType } from '../../context/filter_context'
  import { productDataType } from '../../utils/productData'
  
  const filter_reducer = (
    state: initialStateType,
    action: { type: any; payload?: any }
  ) => {
    if (action.type === LOAD_PRODUCTS) {
      const maxPrice = Math.max(
        ...action.payload.map((item: productDataType) => item.price)
      )
  
      return {
        ...state,
        allProducts: [...action.payload],
        filteredProducts: [...action.payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      }
    }
    if (action.type === SET_GRID_VIEW) {
      return { ...state, gridView: true }
    }
    if (action.type === SET_LIST_VIEW) {
      return { ...state, gridView: false }
    }
    if (action.type === UPDATE_SORT) {
      return { ...state, sort: action.payload }
    }
    if (action.type === SORT_PRODUCTS) {
      let tempProducts = [...state.filteredProducts]
  
      return { ...state, filteredProducts: tempProducts }
    }
    if (action.type === UPDATE_FILTERS) {
      let { name, value, checked } = action.payload
      
     
      return { ...state, filters: { ...state.filters, [name]: value } }
    }
    if (action.type === FILTER_PRODUCTS) {
      const { allProducts } = state
      const {
        searchTerm,
        category,
      } = state.filters
  
      let tempProducts = [...allProducts]
      // filter by searchTerm
      if (searchTerm) {
        tempProducts = tempProducts.filter(product => {
          return (
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        })
      }
      // category
      if (category !== 'all') {
        tempProducts = tempProducts.filter(product => {
          return product.categories === category
        })
      }
  
      return { ...state, filteredProducts: tempProducts }
    }
    if (action.type === CLEAR_FILTERS) {
      return {
        ...state,
        filters: {
          ...state.filters,
          searchTerm: '',
          category: 'all'
        },
      }
    }
    if (action.type === HANDLE_CLICK_FROM_SERVICES) {
      return { ...state, isClickFromServices: true }
    }
    if (action.type === RESET_IS_CLICK_FROM_SERVICES) {
      return { ...state, isClickFromServices: false }
    }
  
    throw new Error(`No Matching "${action.type}" - action type`)
  }
  
  export default filter_reducer