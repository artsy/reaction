import { Box, Button, Flex, Input, Serif } from "@artsy/palette"
import { AuctionApp_sale } from "__generated__/AuctionApp_sale.graphql"
import { RegistrationFormCreateBidderMutation } from "__generated__/RegistrationFormCreateBidderMutation.graphql"
import { RegistrationFormCreateCreditCardMutation } from "__generated__/RegistrationFormCreateCreditCardMutation.graphql"
import { CreditCardInput } from "Apps/Order/Components/CreditCardInput"
import { ConditionsOfSaleCheckbox } from "Components/Auction/ConditionsOfSaleCheckbox"
import { Form, Formik, FormikProps } from "formik"
import React from "react"
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
    values,
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
            error={{ message: errors.credit_card } as stripe.Error}
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
            error={touched.street1 && errors.street1}
            required
            title="Address"
            name="street1"
          />
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
              error={touched.postal_code && errors.postal_code}
              required
              title="Postal code"
              name="postal_code"
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

      <Flex mt={4} mb={2} justifyContent="center">
        <ConditionsOfSaleCheckbox
          error={touched.agree_to_terms && errors.agree_to_terms}
          value={values.agree_to_terms}
          name="agree_to_terms"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Flex>

      <Button mt={1} size="large" width="100%" loading={isSubmitting}>
        Register
      </Button>
    </Form>
  )
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  street1: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  postal_code: Yup.string().required("Postal code is required"),
  telephone: Yup.string().required("Telephone is required"),
  agree_to_terms: Yup.bool().oneOf(
    [true],
    "You must agree to the Conditions of Sale"
  ),
})

export interface RegistrationFormProps
  extends ReactStripeElements.InjectedStripeProps {
  relay?: RelayProp
  sale: AuctionApp_sale
}

const RegistrationForm: React.FC<RegistrationFormProps> = props => {
  function createBidder(setSubmitting) {
    const { sale } = props

    commitMutation<RegistrationFormCreateBidderMutation>(
      props.relay.environment,
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

  function createCreditCard(token) {
    return new Promise(async (resolve, reject) => {
      commitMutation<RegistrationFormCreateCreditCardMutation>(
        props.relay.environment,
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
        agree_to_terms: false,
      }}
      onSubmit={(values: FormValues, { setFieldError, setSubmitting }) => {
        const address = {
          name: values.name,
          address_line1: values.street1,
          address_city: values.city,
          address_state: values.state,
          address_zip: values.postal_code,
        }

        props.stripe.createToken(address).then(({ error, token }) => {
          if (error) {
            setFieldError("credit_card", error.message)
            setSubmitting(false)
          } else {
            createCreditCard(token.id).then(() => {
              createBidder(setSubmitting)
            })
          }
        })
      }}
      validationSchema={validationSchema}
      render={InnerForm}
    />
  )
}

export const WrappedRegistrationForm = injectStripe(RegistrationForm)
