import React from 'react'
import Loading from './Loading'
import { useProductsContext } from '../context/products_context'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'

const ProductList = () => {
  const { productsLoading, allProducts } = useProductsContext()
  const { filteredProducts } = useFilterContext()

  if (productsLoading) {
    return <Loading />
  }
  return <GridView filteredProducts={filteredProducts} />
}

export default ProductList
