import { Button, Input } from "@artsy/palette"
import { CountrySelect } from "Components/v2"
import { Form, FormikProps, withFormik } from "formik"
import React from "react"
import * as Yup from "yup"

// Shape of form values
interface FormValues {
  name: string
  street1: string
  city: string
  state: string
  postal_code: string
  country: string
  telephone: string
}

interface OtherProps {
  message: string
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
  const { touched, errors, message, handleBlur } = props
  return (
    <Form>
      <h1>{message}</h1>
      <Input
        onBlur={handleBlur}
        error={touched.name && errors.name}
        required
        title="Full name"
        placeholder="Add full name"
        name="name"
      />

      <Input
        onBlur={handleBlur}
        error={touched.street1 && errors.street1}
        required
        title="Address"
        name="street1"
      />
      <CountrySelect
        error={touched.country && errors.country}
        onBlur={handleBlur}
        name="country"
      />
      <Input
        onBlur={handleBlur}
        error={touched.city && errors.city}
        required
        title="City"
        name="city"
      />
      <Input
        onBlur={handleBlur}
        error={touched.state && errors.state}
        required
        title="State"
        name="state"
      />
      <Input
        onBlur={handleBlur}
        error={touched.postal_code && errors.postal_code}
        required
        title="Postal code"
        name="postal_code"
      />
      <Input
        onBlur={handleBlur}
        type="tel"
        error={touched.telephone && errors.telephone}
        required
        title="Telephone"
        name="telephone"
      />

      <Button
        size="large"
        width="100%"
        // onClick={this.onSubmit}
        // loading={isCommittingMutation}
      >
        Submit
      </Button>
    </Form>
  )
}

// The type of props MyForm receives
interface MyFormProps {
  initialEmail?: string
  message: string // if this passed all the way through you might do this or make a union type
}

// Wrap our form with the using withFormik HoC
const MyForm = withFormik<MyFormProps, FormValues>({
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    street1: Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    postal_code: Yup.string().required("Postal code is required"),
    telephone: Yup.string().required("Telephone is required"),
  }),

  handleSubmit: values => {
    // do submitting things
    console.log(values)
  },
})(InnerForm)

// Use <MyForm /> wherevs
const Basic = () => (
  <div>
    <h1>My App</h1>
    <p>This can be anywhere in your application</p>
    <MyForm message="Sign up" />
  </div>
)

export default Basic
