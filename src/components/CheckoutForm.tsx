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
  const [editAddress, setEditAddress] = useState(false)
  const [error, setError] = useState('') // error message
  const [processing, setProcessing] = useState(false)
  const [billingDetails, setBillingDetails] = useState({
    address: '',
    city: '',
    country: '',
    postalCode: '',
  })
  const [paymentDetails, setPaymentDetails] = useState({
    paymentType:"",
    provider:"",
    cardNumber:"",
    expirationDate:"",
    cardHolderName:""

  })

  useEffect(()=>{
    getUserAddress()
    getPaymentDetails()
  
  }, [])

  const getUserAddress = async() =>{
    const response = await api.get(`addresses/user/${UserId}`);
    if(response.data){
      setBillingDetails(response.data[0])
    }

  }
const getPaymentDetails = async () =>{
  const response = await api.get(`payment/user/${UserId}`);
    if(response.data){
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

  const handlePaymentChange = (event:any) =>{
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
  

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setProcessing(true)
    const today = new Date(),
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

    const order = { products: cart, id: orders.length + 1, createdAt: date, userId: UserId }

    if (billingDetails && paymentDetails) {
      setError('')
      setProcessing(false)
      setSucceeded(true)
      addToOrder(order) // re-route to successful payment page
      return navigate('/successful_payment')
    }
  }

  const handlePaymentSubmit = async (event: any) =>{
    event.preventDefault()
    sendPaymentData();

  }
  const sendPaymentData = async () => {
    
    const paymentData = {
      paymentType: paymentDetails?.paymentType,
      provider: paymentDetails?.provider,
      cardNumber: paymentDetails?.cardNumber,
      expirationDate: paymentDetails?.expirationDate,
      cardHolderName: paymentDetails?.cardHolderName,
      user: {
        id: UserId,
      },
    };

    const response = await api.post('/payment', paymentData);
  }
  const handleEditDetails = () =>{
    setEditAddress(true);
  }
  const handleEditPayment = () =>{
    setEditPayment(true)

  }
 
const sendAddressData = async() =>{

  const addressData = {
    address: billingDetails?.address,
    city: billingDetails?.city,
    country: billingDetails?.country,
    postalCode: billingDetails?.postalCode,
    user: {
      id: UserId,
    },
  };

  const response = await api.post('/addresses', addressData);

}
const handleAddressSubmit =(event: any) =>{
  event.preventDefault()
  sendAddressData();


}
  return (
    <Wrapper>
     {editAddress ? <form id="payment-form" onSubmit={handleAddressSubmit}>
        <h4>enter billing details:</h4>
        <BillingDetailsFields handleChange={handleChange} />

        

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
      </form> : <form><h4>User Billing Details</h4> <UserDetails billingDetails={billingDetails} /> <button onClick={handleEditDetails}>Edit Details</button></form> }
      

<TestCardDetails>
{ editPayment ? <form onSubmit={handlePaymentSubmit}>
      <h4>card details for test:</h4>  <PaymentDetailsFields handleChange={handlePaymentChange}  />  <button type="submit">Add Payment Details</button> </form> 
 : <Wrapper> <form> <h4>User Payment Details:</h4><PaymentDetails payment={paymentDetails} /> <button onClick={handleEditPayment}>Edit Details</button></form> </Wrapper>}
</TestCardDetails>

     
      
<button type="submit">
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
`

const TestCardDetails = styled.ul`
  color: var(--clr-primary-7);
`
