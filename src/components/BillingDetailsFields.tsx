import FormField from './FormField'

const BillingDetailsFields = (props: { handleChange: any , billingDetails:any}) => {
  const {billingDetails} = props
  return (
    <>
      <FormField
        name="address"
        label="Address"
        type="text"
        value={billingDetails.address}
        placeholder="Herwanta"
        required
        onChange={props.handleChange}
      />
      <FormField
        name="city"
        label="City"
        type="text"
        value={billingDetails.city}
        placeholder="Tampere"
        required
        onChange={props.handleChange}
      />

      <FormField
        name="postalCode"
        label="PostalCode"
        type="text"
        value={billingDetails.postalCode}
        placeholder="33700"
        onChange={props.handleChange}
      />
      <FormField
        name="country"
        label="Country"
        value={billingDetails.country}
        type="text"
        placeholder="Finland"
        required
        onChange={props.handleChange}
      />
    </>
  )
}

export default BillingDetailsFields
