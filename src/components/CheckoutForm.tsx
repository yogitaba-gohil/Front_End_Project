import React, { useState } from 'react'
import { useCartContext } from '../context/cart_context'
import styled from 'styled-components'
import BillingDetailsFields from './BillingDetailsFields'
import { formatPrice } from '../utils/helpers'

export const CheckoutForm = () => {
  const { cart, totalAmount } = useCartContext()
  console.log('totalAmount', totalAmount)
  const [succeeded, setSucceeded] = useState(false) // if the payment succeeded
  const [error, setError] = useState('') // error message
  const [processing, setProcessing] = useState(false) // if the payment is processing
  const [disabled, setDisabled] = useState(false) // disable the pay button

  

  // push to successful payment page

  const handleChange = async (event: any) => {
    setDisabled(event.empty)
    setError(event.error ? event.error.message : '')
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setProcessing(true)

    const billingDetails = {
      name: event.target.name.value,
      email: event.target.email.value,
      address: {
        city: event.target.city.value,
        line1: event.target.address.value,
        state: event.target.state.value,
        postal_code: event.target.zip.value
      }
    }
  }

  return (
    <Wrapper>
      <form id="payment-form" onSubmit={handleSubmit}>
        <h4>enter billing details:</h4>
        <BillingDetailsFields />

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


