import React from 'react'
import { useProductsContext } from '../../context/products_context'
import { formatPrice } from '../../utils/helpers'
import AddToCart from '../../components/AddToCart'

export const SingleProductContent = () => {
  const { singleProduct } = useProductsContext()

  const { name, price, description } = {
    ...singleProduct
  }
  return (
    <section className="content">
      <h2>{name}</h2>
      <h5 className="price">{price && formatPrice(price)}</h5>
      <p className="desc">{description}</p>
      <p className="info">
        <span>Availability : 1 </span>
      </p>

      <p className="info">
        <span>Suitable for height : </span>
        {description}
      </p>

      <>
        <hr />
        <AddToCart singleProduct={singleProduct} />
      </>
    </section>
  )
}
