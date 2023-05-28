import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { useCartContext } from '../context/cart_context'
import BillingDetailsFields from './BillingDetailsFields'
import { formatPrice } from '../utils/helpers'
import { useUserContext } from '../context/user_context'
import PaymentDetailsFields from './PaymentDetailsFields'
import { api } from '../utils/api'
import UserDetails from './UserDetails'
import PaymentDetails from './PaymentDetails'

export const CheckoutForm = () => {
  const { cart, totalAmount, addToOrder, orders } = useCartContext()
  const { user } = useUserContext()
  const UserId = user.id

  const [succeeded, setSucceeded] = useState(false)
  const [editPayment, setEditPayment] = useState(false)
  const [addPayment, setAddPayment] = useState(false)
  const [editAddress, setEditAddress] = useState(false)
  const [addAddress, setAddAddress] = useState(false)
  const [error, setError] = useState('') // error message
  const [processing, setProcessing] = useState(false)
  const [billingDetails, setBillingDetails] = useState({
    address: '',
    city: '',
    country: '',
    postalCode: '',
    id: ''
  })
  const [paymentDetails, setPaymentDetails] = useState({
    paymentType: '',
    provider: '',
    cardNumber: '',
    expirationDate: '',
    cardHolderName: '',
    id: ''
  })

  useEffect(() => {
    getUserAddress()
    getPaymentDetails()
  }, [])

  const getUserAddress = async () => {
    const response = await api.get(`addresses/user/${UserId}`)
    if (response.data) {
      setBillingDetails(response.data[0])
    }
  }
  const getPaymentDetails = async () => {
    const response = await api.get(`payment/user/${UserId}`)
    if (response.data) {
      setPaymentDetails(response.data[0])
    }
  }
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

  const handlePaymentChange = (event: any) => {
    const target = event.target
    const value = target.value
    const name = target.name
    setPaymentDetails((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleCheckout = async () => {
    if (!billingDetails || !paymentDetails) return alert('Please select address and payment method')
    const orderDetails = cart?.map((item) => {
      const { id, image, sizes, price, quantity } = item
      const productId = id
      const size = sizes
      return {
        image,
        price,
        productId,
        quantity,
        user: { id: UserId },
        variant: 'small',
        size
      }
    })

    const response = await api.post('/order-details/all-order-details', orderDetails)

    if (response.status === 200) {
      const idsToCreateOrder = response.data.map((item: any) => item.id)

      const orderToCreate = {
        user: {
          id: UserId
        },
        orderDetails: idsToCreateOrder,
        paymentType: paymentDetails.paymentType,
        shippingAddress: billingDetails.address,
        shippingMethod: 'DOOR',
        shippingFee: 0,
        total: totalAmount
      }
      addToOrder(orderToCreate)
      setError('')
      setProcessing(false)
      setSucceeded(true)
      return navigate('/successful_payment')
    }
  }

  const handlePaymentSubmit = async (event: any) => {
    event.preventDefault()
    sendPaymentData()
    setEditPayment(false)
    setAddPayment(false)
  }
  const sendPaymentData = async () => {
    const paymentData = {
      paymentType: paymentDetails?.paymentType,
      provider: paymentDetails?.provider,
      cardNumber: paymentDetails?.cardNumber,
      expirationDate: paymentDetails?.expirationDate,
      cardHolderName: paymentDetails?.cardHolderName,
      id: paymentDetails?.id,

      user: {
        id: UserId
      }
    }
    if (addPayment) {
      const response = await api.post('/payment', paymentData)
    }
    if (editPayment) {
      const response = await api.put('/payment', paymentData)
    }
  }
  const handleEditDetails = () => {
    setEditAddress(true)
  }
  const handleAddDetails = () => {
    setAddAddress(true)
  }
  const handleEditPayment = () => {
    setEditPayment(true)
  }

  const sendAddressData = async () => {
    const addressData = {
      address: billingDetails?.address,
      city: billingDetails?.city,
      country: billingDetails?.country,
      postalCode: billingDetails?.postalCode,
      id: billingDetails?.id,
      user: {
        id: UserId
      }
    }
    if (addAddress) {
      const response = await api.post('/addresses', addressData)
    }
    if (editAddress) {
      const response = await api.put('/addresses', addressData)
    }
  }
  const handleAddressSubmit = (event: any) => {
    event.preventDefault()
    sendAddressData()
    setEditAddress(false)
    setAddAddress(false)
  }
  return (
    <Wrapper>
      {editAddress || addAddress ? (
        <form id="payment-form" onSubmit={handleAddressSubmit}>
          <h4>enter billing details:</h4>
          <BillingDetailsFields handleChange={handleChange} billingDetails={billingDetails} />
          <button type="submit">Add Billing Details</button>
        </form>
      ) : (
        <form>
          <h4>User Billing Details</h4> <UserDetails billingDetails={billingDetails} />{' '}
          <div className="buttonContainer">
            {/* <button className="productAddButton" onClick={handleAddDetails}>
              Add
            </button> */}

            <button className="productAddButton" onClick={handleEditDetails}>
              Update
            </button>
          </div>
        </form>
      )}

      {editPayment ? (
        <form onSubmit={handlePaymentSubmit}>
          <h4>card details for test:</h4>{' '}
          <PaymentDetailsFields handleChange={handlePaymentChange} />{' '}
          <button type="submit">Add Payment Details</button>{' '}
        </form>
      ) : (
        <Wrapper>
          {' '}
          <form>
            {' '}
            <h4>User Payment Details:</h4>
            <PaymentDetails payment={paymentDetails} />{' '}
            <div className="buttonContainer">
              {/* <button className="productAddButton" onClick={handleEditPayment}>
                Add
              </button> */}

              <button className="productAddButton" onClick={handleEditPayment}>
                Update
              </button>
            </div>
          </form>{' '}
        </Wrapper>
      )}

      <button type="submit" onClick={handleCheckout}>
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner" />
          ) : (
            `Pay ${formatPrice(totalAmount)}`
          )}
        </span>
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 1rem auto;
  .buttonContainer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .productAddButton {
    width: 80px;
    border: none;
    padding: 5px;
    background-color: teal;
    color: white;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin: 10px;
  }
`
