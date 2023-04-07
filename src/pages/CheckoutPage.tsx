import React from 'react'
import styled from 'styled-components'
import PageHero from '../components/PageHero'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import CheckoutContent from '../components/CheckoutContent'

const CheckoutPage = () => {
  const { cart } = useCartContext()

  if (cart.length < 1) {
    return (
      <PageWrapper>
        <div className='empty'>
          <h2>your cart is empty</h2>
          <Link to='products' className='btn'>
            fill your cart
          </Link>
        </div>
      </PageWrapper>
    )
  } else {
    return (
      <PageWrapper>
        <CheckoutContent />
      </PageWrapper>
    )
  }
}
type PageWrapperProps = {
    children: React.ReactNode // children prop typr
  }
const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <main>
      <PageHero title='checkout' />
      <Wrapper className='page'>{children}</Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  display: grid;
  place-items: center;

  .empty {
    text-align: center;
  }
`
export default CheckoutPage
