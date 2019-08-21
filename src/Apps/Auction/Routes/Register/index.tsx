import { Box, Separator, Serif } from "@artsy/palette"
import { Register_sale } from "__generated__/Register_sale.graphql"
import { RegisterCreateBidderMutation } from "__generated__/RegisterCreateBidderMutation.graphql"
import { RegisterCreateCreditCardMutation } from "__generated__/RegisterCreateCreditCardMutation.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { ErrorModal } from "Components/Modal/ErrorModal"
import { FormikActions } from "formik"
import React, { useState } from "react"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { data as sd } from "sharify"
import createLogger from "Utils/logger"
import { StripeWrappedRegistrationForm } from "../../Components/RegistrationForm"
import { FormValues } from "../../Components/RegistrationForm"

const logger = createLogger("Apps/Auction/Routes/Register")

interface RegisterProps {
  sale: Register_sale
  relay?: RelayProp
}

export const RegisterRoute: React.FC<RegisterProps> = props => {
  const { relay, sale } = props
  const [showErrorModal, setShowErrorModal] = useState(false)

  function createBidder() {
    return new Promise(async (resolve, reject) => {
      commitMutation<RegisterCreateBidderMutation>(relay.environment, {
        onCompleted: (data, errors) => {
          resolve()
        },
        onError: error => {
          reject(error)
        },
        mutation: graphql`
          mutation RegisterCreateBidderMutation($input: CreateBidderInput!) {
            createBidder(input: $input) {
              clientMutationId
            }
          }
        `,
        variables: {
          input: { sale_id: sale.id },
        },
      })
    })
  }

  function createCreditCard(token) {
    return new Promise(async (resolve, reject) => {
      commitMutation<RegisterCreateCreditCardMutation>(relay.environment, {
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
          mutation RegisterCreateCreditCardMutation($input: CreditCardInput!) {
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
      })
    })
  }

  function onSubmit(
    values: FormValues,
    actions: FormikActions<object>,
    token: stripe.Token
  ) {
    const { setSubmitting } = actions

    createCreditCard(token.id)
      .then(() => {
        createBidder().then(() => {
          setSubmitting(false)

          window.location.href = `${sd.APP_URL}/auction/${
            sale.id
          }/confirm-registration`
        })
      })
      .catch(error => {
        logger.error(error)

        setSubmitting(false)
        setShowErrorModal(true)
      })
  }

  return (
    <AppContainer>
      <Box maxWidth={550} px={[2, 0]} mx="auto" my={[1, 0]}>
        <Serif size="10">Register to Bid on Artsy</Serif>
        <Separator mt={1} mb={2} />
        <StripeWrappedRegistrationForm onSubmit={onSubmit} />
      </Box>
      <ErrorModal
        show={showErrorModal}
        onClose={() => {
          setShowErrorModal(false)
        }}
      />
    </AppContainer>
  )
}

export const RegisterFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(RegisterRoute),
  {
    sale: graphql`
      fragment Register_sale on Sale {
        id
      }
    `,
  }
)
