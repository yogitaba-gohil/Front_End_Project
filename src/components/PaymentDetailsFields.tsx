import FormField from "./FormField";

const PaymentDetailsFields = (props: { handleChange: any; }) => {
  return (
    <>
      <FormField
        name="cardHolderName"
        label="Card Holder Name"
        type="text"
        placeholder="Card Holder Name"
        required
        onChange={props.handleChange}
      />
      <FormField
        name="paymentType"
        label="Payment Type"
        type="text"
        placeholder="Payment Type"
        required
        onChange={props.handleChange}

      />
      <FormField
        name="provider"
        label="Provider"
        type="text"
        placeholder="Provider"
        required
        onChange={props.handleChange}

      />
      <FormField
        name="cardNumber"
        label="Card Number"
        type="text"
        placeholder="Card Number"
        required
        onChange={props.handleChange}

      />
      
      <FormField
        name="expirationDate"
        label="Expiration Date"
        type="text"
        placeholder="Expiration Date"
        onChange={props.handleChange}

      />
     
    </>
  );
};

export default PaymentDetailsFields;
