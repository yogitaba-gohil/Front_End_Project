import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { useCartContext } from '../context/cart_context'
import BillingDetailsFields from './BillingDetailsFields'
import { formatPrice } from '../utils/helpers'
import { useUserContext } from '../context/user_context'
import { getFields } from '../utils/helpers'

export const CheckoutForm = () => {
  const { cart, totalAmount, addToOrder, orders } = useCartContext()
  const { user } = useUserContext()
  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState('') // error message
  const [processing, setProcessing] = useState(false)
  const [billingDetails, setBillingDetails] = useState({})

  const navigate = useNavigate()

  const handleChange = (event: any) => {
    const target = event.target
    const value = target.value
    const name = target.name
    setBillingDetails((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }
  const UserId = getFields(user, 'id')

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setProcessing(true)
    const today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

    const order = { products: cart, id: orders.length + 1, createdAt: date, userId: UserId }

    if (billingDetails) {
      setError('')
      setProcessing(false)
      setSucceeded(true)
      addToOrder(order) // re-route to successful payment page
      return navigate('/successful_payment')
    }
  }

  return (
    <Wrapper>
      <form id="payment-form" onSubmit={handleSubmit}>
        <h4>enter billing details:</h4>
        <BillingDetailsFields handleChange={handleChange} />

        <h4>card details for test:</h4>
        <TestCardDetails>
          <li>Card number: 4242 4242 4242 4242</li>
          <li>MM/YY: 22/22</li>
          <li>CVC: 222</li>
        </TestCardDetails>

        {/* Show any error that happens when processing the payment */}
        {error ?? (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <button type="submit">
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner" />
            ) : (
              `Pay ${formatPrice(totalAmount)}`
            )}
          </span>
        </button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 1rem auto;
`

const TestCardDetails = styled.ul`
  color: var(--clr-primary-7);
`
