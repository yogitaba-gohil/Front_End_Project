import React from 'react'
import Loading from './Loading'
import { useProductsContext } from '../context/products_context'
import GridView from './GridView'

const ProductList = () => {
  const { productsLoading, allProducts} = useProductsContext()
  
  if (productsLoading) {
    return <Loading />
  }
  return <GridView filteredProducts={allProducts} />
}

export default ProductList
