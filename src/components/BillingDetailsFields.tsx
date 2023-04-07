import FormField from "./FormField";

const BillingDetailsFields = () => {
  return (
    <>
      <FormField
        name="name"
        label="Name"
        type="text"
        placeholder="yogitaba gohil"
        required
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="tast@basicbeauty.com"
        required
      />
      <FormField
        name="address"
        label="Address"
        type="text"
        placeholder="Herwanta"
        required
      />
      <FormField
        name="city"
        label="City"
        type="text"
        placeholder="Tampere"
        required
      />
      
      <FormField
        name="zip"
        label="ZIP"
        type="text"
        placeholder="33700"
      />
      <FormField
        name="country"
        label="Country"
        type="text"
        placeholder="Finland"
        required
      />
    </>
  );
};

export default BillingDetailsFields;
