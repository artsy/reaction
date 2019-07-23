import { Button, Checkbox, Input, Serif } from "@artsy/palette"
import { AuctionApp_me } from "__generated__/AuctionApp_me.graphql"
import { AuctionApp_sale } from "__generated__/AuctionApp_sale.graphql"
import { RegistrationFormCreateBidderMutation } from "__generated__/RegistrationFormCreateBidderMutation.graphql"
import { RegistrationFormCreateCreditCardMutation } from "__generated__/RegistrationFormCreateCreditCardMutation.graphql"
import { CreditCardInput } from "Apps/Order/Components/CreditCardInput"
import { CountrySelect } from "Components/v2"
import { Form, Formik, FormikProps } from "formik"
import React, { Component } from "react"
import { commitMutation, graphql, RelayProp } from "react-relay"
import {
  CardElement,
  injectStripe,
  ReactStripeElements,
} from "react-stripe-elements"
import { data as sd } from "sharify"
import styled from "styled-components"
import * as Yup from "yup"

export const StyledCardElement = styled(CardElement)`
  width: 100%;
  padding: 9px 10px;
`

interface FormValues {
  name: string
  street1: string
  city: string
  state: string
  credit_card: string
  postal_code: string
  country: string
  telephone: string
  agree_to_terms: boolean
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const {
    touched,
    errors,
    handleBlur,
    isSubmitting,
    handleChange,
    setFieldValue,
    values,
  } = props

  console.log(values, touched, errors)

  return (
    <Form>
      <Input
        onBlur={handleBlur}
        onChange={handleChange}
        error={touched.name && errors.name}
        required
        title="Full name"
        placeholder="Add full name"
        name="name"
      />

      <CreditCardInput
        error={{ message: errors.credit_card } as stripe.Error}
      />

      <Input
        onBlur={handleBlur}
        onChange={handleChange}
        error={touched.street1 && errors.street1}
        required
        title="Address"
        name="street1"
      />
      {false && (
        <CountrySelect
          error={touched.country && errors.country}
          onBlur={handleBlur}
          name="country"
        />
      )}
      <Input
        onBlur={handleBlur}
        onChange={handleChange}
        error={touched.city && errors.city}
        required
        title="City"
        name="city"
      />
      <Input
        onBlur={handleBlur}
        onChange={handleChange}
        error={touched.state && errors.state}
        required
        title="State"
        name="state"
      />
      <Input
        onBlur={handleBlur}
        onChange={handleChange}
        error={touched.postal_code && errors.postal_code}
        required
        title="Postal code"
        name="postal_code"
      />
      <Input
        onBlur={handleBlur}
        onChange={handleChange}
        type="tel"
        error={touched.telephone && errors.telephone}
        required
        title="Telephone"
        name="telephone"
      />

      <Checkbox
        error={touched.agree_to_terms && errors.agree_to_terms}
        onSelect={selected => setFieldValue("agree_to_terms", selected)}
        selected={values.agree_to_terms}
      >
        <Serif size="2">
          Agree to{" "}
          <a href="https://www.artsy.net/conditions-of-sale">
            Conditions of Sale
          </a>
          .
        </Serif>
      </Checkbox>

      <Button mt={1} size="large" width="100%" loading={isSubmitting}>
        Submit
      </Button>
    </Form>
  )
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  street1: Yup.string().required("Address is required"),
  // country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postal_code: Yup.string().required("Postal code is required"),
  telephone: Yup.string().required("Telephone is required"),
  agree_to_terms: Yup.bool().oneOf(
    [true],
    "You must agree to the terms of sale"
  ),
})

export interface RegistrationFormProps
  extends ReactStripeElements.InjectedStripeProps {
  relay?: RelayProp
  me: AuctionApp_me
  sale: AuctionApp_sale
}

class RegistrationForm extends Component<RegistrationFormProps> {
  private createBidder(setSubmitting) {
    const { sale } = this.props

    commitMutation<RegistrationFormCreateBidderMutation>(
      this.props.relay.environment,
      {
        onCompleted: (data, errors) => {
          setSubmitting(false)

          window.location.href = `${sd.APP_URL}/auction/${
            sale.id
          }/confirm-registration`
        },
        onError: error => {
          setSubmitting(false)
        },
        mutation: graphql`
          mutation RegistrationFormCreateBidderMutation(
            $input: CreateBidderInput!
          ) {
            createBidder(input: $input) {
              clientMutationId
            }
          }
        `,
        variables: {
          input: { sale_id: sale.id },
        },
      }
    )
  }

  private createCreditCard({ token, me }) {
    return new Promise(async (resolve, reject) => {
      commitMutation<RegistrationFormCreateCreditCardMutation>(
        this.props.relay.environment,
        {
          onCompleted: (data, errors) => {
            const {
              createCreditCard: { creditCardOrError },
            } = data

            if (creditCardOrError.creditCardEdge) {
              resolve()
            } else {
              if (errors) {
                reject(errors)
              } else {
                reject(creditCardOrError.mutationError)
              }
            }
          },
          onError: reject,
          mutation: graphql`
            mutation RegistrationFormCreateCreditCardMutation(
              $input: CreditCardInput!
            ) {
              createCreditCard(input: $input) {
                creditCardOrError {
                  ... on CreditCardMutationSuccess {
                    creditCardEdge {
                      node {
                        last_digits
                      }
                    }
                  }
                  ... on CreditCardMutationFailure {
                    mutationError {
                      type
                      message
                      detail
                    }
                  }
                }
              }
            }
          `,
          variables: {
            input: { token },
          },
        }
      )
    })
  }

  render() {
    return (
      <Formik
        initialValues={{
          name: "",
          street1: "",
          city: "",
          credit_card: null,
          state: "",
          postal_code: "",
          telephone: "",
          country: "",
          agree_to_terms: false,
        }}
        onSubmit={(values: FormValues, { setFieldError, setSubmitting }) => {
          const { me } = this.props

          const address = {
            name: values.name,
            address_line1: values.street1,
            address_city: values.city,
            address_state: values.state,
            address_zip: values.postal_code,
            address_country: "United States",
          }

          this.props.stripe.createToken(address).then(({ error, token }) => {
            if (error) {
              setFieldError("credit_card", error.message)
              setSubmitting(false)
            } else {
              console.log(token)
              this.createCreditCard({ token: token.id, me }).then(() => {
                this.createBidder(setSubmitting)
              })
            }
          })
        }}
        validationSchema={validationSchema}
        render={InnerForm}
      />
    )
  }
}

export default injectStripe(RegistrationForm)
