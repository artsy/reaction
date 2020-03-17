import { Box, Button, Link, Sans, Serif } from "@artsy/palette"
import { IdentityVerificationApp_me } from "__generated__/IdentityVerificationApp_me.graphql"
import { IdentityVerificationAppStartFlowMutation } from "__generated__/IdentityVerificationAppStartFlowMutation.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { useTracking } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"
import { ErrorPage } from "Components/ErrorPage"
import { ErrorModal } from "Components/Modal/ErrorModal"
import React, { useState } from "react"
import { Title as HeadTitle } from "react-head"
import {
  commitMutation,
  createFragmentContainer,
  graphql,
  RelayProp,
} from "react-relay"
import createLogger from "Utils/logger"

const logger = createLogger("IdentityVerificationApp.tsx")

interface Props {
  me: IdentityVerificationApp_me
  relay: RelayProp
}

const IdentityVerificationApp: React.FC<Props> = ({ me, relay }) => {
  const { identityVerification } = me
  const { environment } = relay

  const [requesting, setRequesting] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)

  if (!identityVerification || identityVerification.userID !== me.internalID) {
    return <ErrorPage code={404} />
  }

  const { trackEvent } = useTracking()

  const trackClickedContinueToVerification = () => {
    trackEvent({
      context_page_owner_id: identityVerification.internalID,
      action_type: Schema.ActionType.ClickedContinueToIdVerification,
      context_page: Schema.PageName.IdentityVerificationPage,
    })
  }

  async function startIdentityVerification() {
    const mutation = new Promise<string>((resolve, reject) => {
      commitMutation<IdentityVerificationAppStartFlowMutation>(environment, {
        mutation: graphql`
          mutation IdentityVerificationAppStartFlowMutation(
            $input: startIdentityVerificationMutationInput!
          ) {
            startIdentityVerification(input: $input) {
              startIdentityVerificationResponseOrError {
                ... on StartIdentityVerificationSuccess {
                  identityVerificationFlowUrl
                }
                ... on StartIdentityVerificationFailure {
                  mutationError {
                    detail
                    error
                    message
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: { identityVerificationId: identityVerification.internalID },
        },
        onError: reject,
        onCompleted: (response, errors) => {
          if (errors && errors.length > 0) {
            reject(new Error(JSON.stringify(errors)))
          } else {
            const {
              startIdentityVerification: {
                startIdentityVerificationResponseOrError: {
                  identityVerificationFlowUrl,
                  mutationError,
                },
              },
            } = response
            if (mutationError) {
              reject(new Error(JSON.stringify(mutationError)))
            } else {
              resolve(identityVerificationFlowUrl)
            }
          }
        },
      })
    })

    mutation
      .then(handleMutationSuccess)
      .catch(handleMutationError)
      .finally(() => {
        setRequesting(false)
      })
  }

  const handleMutationSuccess = (identityVerificationFlowUrl: string) => {
    location.assign(identityVerificationFlowUrl)
  }

  const handleMutationError = (error: Error) => {
    logger.error("Error when trying to start identity verification", error)
    setShowErrorModal(true)
  }

  return (
    <AppContainer>
      <HeadTitle>Artsy | ID Verification</HeadTitle>

      <ErrorModal
        show={showErrorModal}
        contactEmail="verification@artsy.net"
        onClose={() => setShowErrorModal(false)}
      />

      <Box px="2" mb="6" mt="3" mx="auto" width="100%" maxWidth="400px">
        <Serif size="6" textAlign="center">
          Artsy identity verification
        </Serif>

        <Sans size="4" mt="2" weight="medium">
          You’ll need
        </Sans>
        <Sans size="4">
          • A camera on your phone or computer
          <br />• Your government ID
        </Sans>

        <Sans size="4" mt="2" weight="medium">
          Keep in mind
        </Sans>
        <Sans size="4">
          • Verification will take 5–10 minutes
          <br />
          • The name on your ID must match the name on your payment method
          <br />
          • Your ID and photo will only be used for verification purposes, and
          will not be shared
          <br />
          <br />
          By clicking the button, you'll be redirected to our identity
          verification partner.
        </Sans>

        <Button
          mt="4"
          width="100%"
          loading={requesting}
          onClick={() => {
            setRequesting(true)
            trackClickedContinueToVerification()
            startIdentityVerification()
          }}
        >
          Continue to verification
        </Button>

        <Sans mt="4" size="4" color="black60">
          For more information, see the{" "}
          <Link href="/identity-verification-faq">FAQ</Link>.
        </Sans>
      </Box>
    </AppContainer>
  )
}

export const IdentityVerificationAppFragmentContainer = createFragmentContainer(
  IdentityVerificationApp,
  {
    me: graphql`
      fragment IdentityVerificationApp_me on Me
        @argumentDefinitions(id: { type: "String!" }) {
        internalID
        name
        identityVerification(id: $id) {
          internalID
          userID
        }
      }
    `,
  }
)
export default IdentityVerificationAppFragmentContainer
