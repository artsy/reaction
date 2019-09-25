import { Box, Separator, Serif } from "@artsy/palette"
import { Register_me } from "__generated__/Register_me.graphql"
import { Register_sale } from "__generated__/Register_sale.graphql"
import {
  RegisterCreateBidderMutation,
  RegisterCreateBidderMutationResponse,
} from "__generated__/RegisterCreateBidderMutation.graphql"
import { RegisterCreateCreditCardAndUpdatePhoneMutation } from "__generated__/RegisterCreateCreditCardAndUpdatePhoneMutation.graphql"
import {
  FormResult,
  StripeWrappedRegistrationForm,
} from "Apps/Auction/Components/RegistrationForm"
import { AppContainer } from "Apps/Components/AppContainer"
import { trackPageViewWrapper } from "Apps/Order/Utils/trackPageViewWrapper"
import { track } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"
import { FormikActions } from "formik"
import React from "react"
import { Title } from "react-head"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import { TrackingProp } from "react-tracking"
import { data as sd } from "sharify"
import createLogger from "Utils/logger"

const logger = createLogger("Apps/Auction/Routes/Register")

interface RegisterProps {
  sale: Register_sale
  me: Register_me
  relay: RelayProp
  tracking: TrackingProp
}

export const RegisterRoute: React.FC<RegisterProps> = props => {
  const { me, relay, sale, tracking } = props

  const commonProperties = {
    auction_slug: sale.id,
    auction_state: sale.status,
    sale_id: sale._id,
    user_id: me.id,
  }

  function trackRegistrationFailed(errors: string[]) {
    tracking.trackEvent({
      action_type: Schema.ActionType.RegistrationSubmitFailed,
      error_messages: errors,
      ...commonProperties,
    })
  }

  function trackRegistrationSuccess(bidderId: string) {
    tracking.trackEvent({
      action_type: Schema.ActionType.RegistrationSubmitted,
      bidder_id: bidderId,
      ...commonProperties,
    })
  }

  function createBidder() {
    return new Promise(async (resolve, reject) => {
      commitMutation<RegisterCreateBidderMutation>(relay.environment, {
        onCompleted: data => {
          resolve(data)
        },
        onError: error => {
          reject(error)
        },
        mutation: graphql`
          mutation RegisterCreateBidderMutation($input: CreateBidderInput!) {
            createBidder(input: $input) {
              bidder {
                id
              }
            }
          }
        `,
        variables: {
          input: { sale_id: sale.id },
        },
      })
    })
  }

  function createCreditCardAndUpdatePhone(phone, token) {
    return new Promise(async (resolve, reject) => {
      commitMutation<RegisterCreateCreditCardAndUpdatePhoneMutation>(
        relay.environment,
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
            mutation RegisterCreateCreditCardAndUpdatePhoneMutation(
              $creditCardInput: CreditCardInput!
              $profileInput: UpdateMyProfileInput!
            ) {
              updateMyUserProfile(input: $profileInput) {
                user {
                  id
                }
              }

              createCreditCard(input: $creditCardInput) {
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
            creditCardInput: { token },
            profileInput: { phone },
          },
        }
      )
    })
  }

  function handleMutationError(actions: FormikActions<object>, error: Error) {
    logger.error(error)

    let errorMessages: string[]
    if (Array.isArray(error)) {
      errorMessages = error.map(e => e.message)
    } else if (typeof error === "string") {
      errorMessages = [error]
    } else if (error.message) {
      errorMessages = [error.message]
    }

    trackRegistrationFailed(errorMessages)

    actions.setSubmitting(false)
    actions.setStatus("submissionFailed")
  }

  function handleSubmit(actions: FormikActions<object>, result: FormResult) {
    createCreditCardAndUpdatePhone(result.phoneNumber, result.token.id)
      .then(() => {
        createBidder()
          .then((data: RegisterCreateBidderMutationResponse) => {
            trackRegistrationSuccess(data.createBidder.bidder.id)

            window.location.assign(
              `${sd.APP_URL}/auction/${sale.id}/confirm-registration`
            )
          })
          .catch(error => {
            handleMutationError(actions, error)
          })
      })
      .catch(error => {
        handleMutationError(actions, error)
      })
  }

  return (
    <AppContainer>
      <Title>Auction Registration</Title>
      <Box maxWidth={550} px={[2, 0]} mx="auto" mt={[1, 0]} mb={[1, 100]}>
        <Serif size="10">Register to Bid on Artsy</Serif>
        <Separator mt={1} mb={2} />

        <StripeWrappedRegistrationForm
          onSubmit={handleSubmit}
          trackSubmissionErrors={trackRegistrationFailed}
        />
      </Box>
    </AppContainer>
  )
}

const TrackingWrappedRegisterRoute: React.FC<RegisterProps> = props => {
  const Component = track({
    context_page: Schema.PageName.AuctionRegistrationPage,
  })(RegisterRoute)

  return <Component {...props} />
}

export const RegisterRouteFragmentContainer = createFragmentContainer(
  trackPageViewWrapper(TrackingWrappedRegisterRoute),
  {
    sale: graphql`
      fragment Register_sale on Sale {
        id
        _id
        status
      }
    `,
    me: graphql`
      fragment Register_me on Me {
        id
      }
    `,
  }
)
