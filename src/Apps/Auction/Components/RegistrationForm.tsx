import { Box, Button, Flex, Input, Sans, Serif } from "@artsy/palette"
import { CreditCardInput } from "Apps/Order/Components/CreditCardInput"
import { ConditionsOfSaleCheckbox } from "Components/Auction/ConditionsOfSaleCheckbox"
import { CountrySelect } from "Components/v2"
import { Form, Formik, FormikActions, FormikProps } from "formik"
import React, { useEffect, useState } from "react"
import {
  CardElement,
  Elements,
  injectStripe,
  ReactStripeElements,
  StripeProvider,
} from "react-stripe-elements"
import { data as sd } from "sharify"
import styled from "styled-components"
import * as Yup from "yup"

export const StyledCardElement = styled(CardElement)`
  width: 100%;
  padding: 9px 10px;
`

export interface FormValues {
  name: string
  street: string
  country: string
  city: string
  state: string
  creditCard: string
  postalCode: string
  telephone: string
  agreeToTerms: boolean
}

const InnerForm: React.FC<FormikProps<FormValues>> = props => {
  const {
    touched,
    errors,
    handleBlur,
    isSubmitting,
    handleChange,
    values,
    setFieldValue,
    setFieldTouched,
  } = props

  return (
    <Form>
      <Box mt={4}>
        <Serif weight="semibold" size="4t" mb={2}>
          Card Information
        </Serif>
        <Box mb={2}>
          <Input
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.name && errors.name}
            required
            title="Name on card"
            placeholder="Add full name"
            name="name"
          />
        </Box>

        <Box mb={2}>
          <Serif size="3t" mb={0.5}>
            Credit card number*
          </Serif>
          <CreditCardInput
            error={{ message: errors.creditCard } as stripe.Error}
          />
        </Box>
      </Box>
      <Box mt={4}>
        <Serif weight="semibold" size="4t">
          Billing Address
        </Serif>
        <Box mt={2}>
          <Input
            onBlur={handleBlur}
            onChange={handleChange}
            error={touched.street && errors.street}
            required
            title="Address"
            name="street"
          />
        </Box>
        <Box mt={2}>
          <Serif size="3t" mb={0.5}>
            Country*
          </Serif>
          <CountrySelect
            selected={values.country}
            onSelect={value => {
              setFieldValue("country", value)
              setFieldTouched("country")
            }}
          />
          {touched.country && errors.country && (
            <Sans mt={1} color="red100" size="2">
              {errors.country}
            </Sans>
          )}
        </Box>
        <Flex mt={2}>
          <Flex flexBasis="50%" flexGrow="2" mr={1}>
            <Input
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.city && errors.city}
              required
              title="City"
              name="city"
            />
          </Flex>
          <Flex flexBasis="25%" flexGrow="1" mr={1}>
            <Input
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.state && errors.state}
              required
              title="State"
              name="state"
            />
          </Flex>
          <Flex flexBasis="25%" flexGrow="1">
            <Input
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.postalCode && errors.postalCode}
              required
              title="Postal code"
              name="postalCode"
            />
          </Flex>
        </Flex>
        <Box mt={2}>
          <Input
            onBlur={handleBlur}
            onChange={handleChange}
            type="tel"
            error={touched.telephone && errors.telephone}
            required
            title="Telephone"
            name="telephone"
          />
        </Box>
      </Box>

      <Flex mt={4} mb={2} flexDirection="column" justifyContent="center">
        <Box mx="auto">
          <ConditionsOfSaleCheckbox
            selected={values.agreeToTerms}
            onSelect={value => {
              setFieldValue("agreeToTerms", value)
              setFieldTouched("agreeToTerms")
            }}
          />
        </Box>

        {touched.agreeToTerms && errors.agreeToTerms && (
          <Sans mt={1} color="red100" size="2" textAlign="center">
            {errors.agreeToTerms}
          </Sans>
        )}
      </Flex>

      <Button mt={1} size="large" width="100%" loading={isSubmitting}>
        Register
      </Button>
    </Form>
  )
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  street: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postalCode: Yup.string().required("Postal code is required"),
  telephone: Yup.string().required("Telephone is required"),
  agreeToTerms: Yup.bool().oneOf(
    [true],
    "You must agree to the Conditions of Sale"
  ),
})

export interface RegistrationFormProps
  extends ReactStripeElements.InjectedStripeProps {
  onSubmit: (
    values: FormValues,
    formikActions: FormikActions<object>,
    token: stripe.Token
  ) => void
}

export const RegistrationForm: React.FC<RegistrationFormProps> = props => {
  const initialValues = {
    name: "",
    street: "",
    country: "",
    city: "",
    creditCard: undefined,
    state: "",
    postalCode: "",
    telephone: "",
    agreeToTerms: false,
  }

  function onSubmit(values: FormValues, actions: FormikActions<object>) {
    const address = {
      name: values.name,
      address_line1: values.street,
      address_country: values.country,
      address_city: values.city,
      address_state: values.state,
      address_zip: values.postalCode,
    }

    const { setFieldError, setSubmitting } = actions
    const { stripe } = props

    stripe.createToken(address).then(({ error, token }) => {
      if (error) {
        setFieldError("creditCard", error.message)
        setSubmitting(false)
      } else {
        props.onSubmit(values, actions, token)
      }
    })
  }

  return (
    <Box maxWidth={550}>
      <Serif size="4" color="black100">
        Please enter your credit card information below. The name on your Artsy
        account must match the name on the card, and a valid credit card is
        required in order to bid.
      </Serif>
      <Serif size="4" mt={2} color="black100">
        Registration is free. Artsy will never charge this card without your
        permission, and you are not required to use this card to pay if you win.
      </Serif>
      <Box mt={2}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          render={InnerForm}
        />
      </Box>
    </Box>
  )
}

export const StripeWrappedRegistrationForm: React.FC<
  RegistrationFormProps
> = props => {
  const [stripe, setStripe] = useState(null)

  function setupStripe() {
    setStripe(window.Stripe(sd.STRIPE_PUBLISHABLE_KEY))
  }

  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(sd.STRIPE_PUBLISHABLE_KEY))
    } else {
      document.querySelector("#stripe-js").addEventListener("load", setupStripe)

      return () => {
        document
          .querySelector("#stripe-js")
          .removeEventListener("load", setupStripe)
      }
    }
  }, [])

  const StripeInjectedRegistrationForm = injectStripe(RegistrationForm)

  return (
    <StripeProvider stripe={stripe}>
      <Elements>
        <StripeInjectedRegistrationForm {...props} />
      </Elements>
    </StripeProvider>
  )
}
