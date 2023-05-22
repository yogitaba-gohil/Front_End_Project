import React from 'react'
import styled from 'styled-components'
import LabelField from './LabelField'

const PaymentDetails = (props: any) => {
  const { paymentType, provider, cardNumber, expirationDate, cardHolderName } = props.payment
  return (
    <Wrapper>
      <LabelField label="Card Holder Name" name="cardHolderName" title={cardHolderName} />
      <LabelField label="paymentType" name="paymentType" title={paymentType} />
      <LabelField label="cardNumber" name="cardNumber" title={cardNumber} />
      <LabelField label="expirationDate" name="expirationDate" title={expirationDate} />
      <LabelField label="provider" name="provider" title={provider} />
    </Wrapper>
  )
}

export default PaymentDetails

const Wrapper = styled.div`
  margin: 1rem auto;
`
