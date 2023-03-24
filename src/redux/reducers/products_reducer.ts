import { GET_PRODUCTS_BEGIN, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR } from '../actions/action'

import { initialStateType } from '../../context/products_context'

const products_reducer = (state: initialStateType, action: any) => {
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, productsLoading: true }
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    
    // data retrieved from API doesn't fit productDataType shape
    const allProducts = action.payload.map((product: any) => {
      let { id: id, name, image } = product

      return {
        id,
        name,
        image
      }
    })

    return { ...state, productsLoading: false, allProducts }
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, productsError: true, productsLoading: false }
  }

  // return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default products_reducer
