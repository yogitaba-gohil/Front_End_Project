import FormField from "./FormField";

const BillingDetailsFields = (props: { handleChange: any; }) => {
  return (
    <>
      <FormField
        name="name"
        label="Name"
        type="text"
        placeholder="yogitaba gohil"
        required
        onChange={props.handleChange}
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="tast@basicbeauty.com"
        required
        onChange={props.handleChange}

      />
      <FormField
        name="address"
        label="Address"
        type="text"
        placeholder="Herwanta"
        required
        onChange={props.handleChange}

      />
      <FormField
        name="city"
        label="City"
        type="text"
        placeholder="Tampere"
        required
        onChange={props.handleChange}

      />
      
      <FormField
        name="zip"
        label="ZIP"
        type="text"
        placeholder="33700"
        onChange={props.handleChange}

      />
      <FormField
        name="country"
        label="Country"
        type="text"
        placeholder="Finland"
        required
        onChange={props.handleChange}

      />
    </>
  );
};

export default BillingDetailsFields;
