import FormField from "./FormField";

const PaymentDetailsFields = (props: { handleChange: any, paymentDetails:any }) => {
  return (
    <>
      <FormField
        name="cardHolderName"
        label="Card Holder Name"
        type="text"
        placeholder="Card Holder Name"
        required
        onChange={props.handleChange}
        value={props.paymentDetails.cardHolderName}
      />
      <FormField
        name="paymentType"
        label="Payment Type"
        type="text"
        placeholder="Payment Type"
        required
        onChange={props.handleChange}
        value={props.paymentDetails.paymentType}

      />
      <FormField
        name="provider"
        label="Provider"
        type="text"
        placeholder="Provider"
        required
        onChange={props.handleChange}
        value={props.paymentDetails.provider}

      />
      <FormField
        name="cardNumber"
        label="Card Number"
        type="text"
        placeholder="Card Number"
        required
        onChange={props.handleChange}
        value={props.paymentDetails.cardNumber}

      />
      
      <FormField
        name="expirationDate"
        label="Expiration Date"
        type="text"
        placeholder="Expiration Date"
        onChange={props.handleChange}
        value={props.paymentDetails.expirationDate}

      />
     
    </>
  );
};

export default PaymentDetailsFields;
