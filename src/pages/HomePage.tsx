import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import { useProductsContext } from '../context/products_context'



const HomePage = () => {
  const {fetchProducts, allProducts} = useProductsContext()

  console.log('allProducts', allProducts)

  useEffect(() => {
    // when component mounts clear the filter
    
    fetchProducts()
  }, [])
  return (
    <main>
      <Hero />
    </main>
  )
}

export default HomePage