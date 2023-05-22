import React from 'react'
import styled from 'styled-components'
import LabelField from './LabelField'

const UserDetails = (props: any) => {
  const { address, city, country, postalCode } = props.billingDetails
  return (
    <Wrapper>
      <LabelField label="Address" name="Address" title={address} />
      <LabelField label="City" name="City" title={city} />
      <LabelField label="PostalCode" name="PostalCode" title={postalCode} />
      <LabelField label="Country" name="Country" title={country} />
    </Wrapper>
  )
}

export default UserDetails

const Wrapper = styled.div`
  margin: 1rem auto;
`
