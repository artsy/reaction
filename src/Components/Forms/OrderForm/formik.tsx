import yup from "yup"

// NOTE: This is super WIP...

const validationSchema = {
  fullName: yup.string().required("Full name is required"),
  addressLine1: yup.string().required("Address is required"),
  addressLine2: yup.string().notRequired(),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  postalCode: yup.string().required("Postal code is required"),
  country: yup.string().required("Country"),

  nameOnCard: yup.string().required("Name is required"),
  cardNumber: yup.string().required("Card number is required"),
  exipiration: yup.string().required("Exipration is required"),
  securityCode: yup.string().required("Security code is required"),
  agreeToTerms: yup.boolean().required("You must agree to terms"),

  sameAsShipping: true,

  billingAddress: {
    // TODO: Only validate when sameAsShipping: false
  },
}

export const formikConfiguration = {
  mapPropsToValues: () => ({
    // ShippingForm.jsx
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",

    // PaymentForm.jsx
    nameOnCard: "",
    cardNumber: "",
    expiration: "",
    securityCode: "",

    sameAsShipping: true,

    billingAddress: {
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },

    // ReviewForm
    agreeToTerms: false,
  }),

  validationSchema,

  handleSubmit: (values, { props, setSubmitting, setErrors }) => {
    setSubmitting(true)
  },
}
