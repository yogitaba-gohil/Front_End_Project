import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import { useProductsContext } from '../context/products_context'



const HomePage = () => {
  const {fetchProducts} = useProductsContext()

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