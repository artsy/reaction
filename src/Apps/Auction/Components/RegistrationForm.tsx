import { Box, Button, Flex, Sans, Serif } from "@artsy/palette"
import { Address, AddressForm } from "Apps/Order/Components/AddressForm"
import { CreditCardInput } from "Apps/Order/Components/CreditCardInput"
import { ConditionsOfSaleCheckbox } from "Components/Auction/ConditionsOfSaleCheckbox"
import { ErrorModal } from "Components/Modal/ErrorModal"
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

export interface FormResult {
  token: stripe.Token
  phoneNumber: string
}

export interface FormValues {
  address: Address
  creditCard: string
  agreeToTerms: boolean
}

const InnerForm: React.FC<FormikProps<FormValues>> = props => {
  const {
    touched,
    errors,
    isSubmitting,
    values,
    setFieldValue,
    setFieldTouched,
  } = props

  return (
    <Form>
      <Box mt={4}>
        <Box mb={2}>
          <Serif size="3t" mb={0.5}>
            Credit card
          </Serif>
          <CreditCardInput
            error={{ message: errors.creditCard } as stripe.Error}
          />
        </Box>
      </Box>
      <Box mt={4}>
        <Box mt={2}>
          <AddressForm
            value={values.address}
            onChange={(address, _key) => {
              setFieldValue("address", address)
            }}
            errors={errors.address}
            touched={touched.address}
            billing
            showPhoneNumberInput
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

      <Button
        mt={1}
        size="large"
        width="100%"
        loading={isSubmitting}
        {...{ type: "submit" } as any}
      >
        Register
      </Button>
    </Form>
  )
}

Yup.addMethod(Yup.string, "present", function(message) {
  return this.test("test-present", message, value => {
    return this.trim()
      .required(message)
      .isValid(value)
  })
})

const validationSchema = Yup.object().shape({
  address: Yup.object({
    name: Yup.string().present("Name is required"),
    addressLine1: Yup.string().present("Address is required"),
    country: Yup.string().present("Country is required"),
    city: Yup.string().present("City is required"),
    region: Yup.string().present("State is required"),
    postalCode: Yup.string().present("Postal code is required"),
    phoneNumber: Yup.string().present("Telephone is required"),
  }),
  agreeToTerms: Yup.bool().oneOf(
    [true],
    "You must agree to the Conditions of Sale"
  ),
})

type TrackErrors = (errors: string[]) => void

/*
  This component exists only to capture formik's renderProps and track form
  submission events. It essentially says:
  - IF the form has been submitted at least once
  - AND the form is not submitting at this moment
  - AND the form is invalid
  - AND (in useEffect dependencies array) the form submitting state just
    changed (because it is false, it must have been true above)
  - THEN run the callback prop.
  Background:
    https://github.com/jaredpalmer/formik/issues/1484#issuecomment-490558973
 */
const OnSubmitValidationError: React.FC<{
  cb: TrackErrors
  formikProps: FormikProps<FormValues>
}> = props => {
  const { cb, formikProps } = props

  const effect = () => {
    if (
      formikProps.submitCount > 0 &&
      !formikProps.isSubmitting &&
      !formikProps.isValid
    ) {
      const clonedErrors = Object.assign({}, formikProps.errors)
      const addressErrors = clonedErrors.address
      delete clonedErrors.address

      const errors = Object.assign({}, clonedErrors, addressErrors)

      cb(Object.values(errors))
      formikProps.setSubmitting(false)
    }
  }
  React.useEffect(effect, [formikProps.submitCount, formikProps.isSubmitting])

  return null
}

export interface RegistrationFormProps
  extends ReactStripeElements.InjectedStripeProps {
  onSubmit: (formikActions: FormikActions<object>, result: FormResult) => void
  trackSubmissionErrors: TrackErrors
}

export const RegistrationForm: React.FC<RegistrationFormProps> = props => {
  const initialValues: FormValues = {
    address: {
      name: "",
      addressLine1: "",
      addressLine2: "",
      country: "US",
      city: "",
      region: "",
      postalCode: "",
      phoneNumber: "",
    },
    creditCard: undefined,
    agreeToTerms: false,
  }

  function createTokenAndSubmit(
    values: FormValues,
    actions: FormikActions<object>
  ) {
    const address = {
      name: values.address.name,
      address_line1: values.address.addressLine1,
      address_line2: values.address.addressLine2,
      address_country: values.address.country,
      address_city: values.address.city,
      address_state: values.address.region,
      address_zip: values.address.postalCode,
    }

    const { setFieldError, setSubmitting } = actions
    const { stripe } = props

    stripe.createToken(address).then(({ error, token }) => {
      if (error) {
        setFieldError("creditCard", error.message)
        setSubmitting(false)
      } else {
        const result: FormResult = {
          phoneNumber: values.address.phoneNumber,
          token,
        }

        props.onSubmit(actions, result)
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
          onSubmit={createTokenAndSubmit}
          validationSchema={validationSchema}
          render={(formikProps: FormikProps<FormValues>) => (
            <>
              <OnSubmitValidationError
                cb={props.trackSubmissionErrors}
                formikProps={formikProps}
              />
              <InnerForm {...formikProps} />
              <ErrorModal
                show={formikProps.status === "submissionFailed"}
                onClose={() => {
                  formikProps.setStatus(null)
                }}
              />
            </>
          )}
        />
      </Box>
    </Box>
  )
}

const StripeInjectedRegistrationForm = injectStripe(RegistrationForm)

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

  return (
    <StripeProvider stripe={stripe}>
      <Elements>
        <StripeInjectedRegistrationForm {...props} />
      </Elements>
    </StripeProvider>
  )
}
