import { Box, Button, Sans, Serif } from "@artsy/palette"
import { StartIdentityVerificationMutation } from "__generated__/StartIdentityVerificationMutation.graphql"
import * as Schema from "Artsy/Analytics/Schema"
import { ErrorModal } from "Components/Modal/ErrorModal"
import React, { useState } from "react"
import { RelayProp } from "react-relay"
import { useTracking } from "react-tracking"
import { commitMutation, graphql } from "relay-runtime"
import createLogger from "Utils/logger"

const logger = createLogger("StartIdentityVerification.tsx")

interface Props {
  relay: RelayProp
  identityVerification: {
    internalID: string
  }
}

export const StartIdentityVerification: React.FC<Props> = ({
  identityVerification,
  relay: { environment },
}) => {
  const [requesting, setRequesting] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
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
      commitMutation<StartIdentityVerificationMutation>(environment, {
        mutation: graphql`
          mutation StartIdentityVerificationMutation(
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
    <>
      <ErrorModal
        show={showErrorModal}
        contactEmail="verification@artsy.net"
        onClose={() => {
          setShowErrorModal(false)
        }}
      />
      <Box px={[2, 3]} mb={6} mt={4}>
        <Box
          mx={["auto"]}
          width={["100%", "80%"]}
          maxWidth={"400px"}
          textAlign="center"
        >
          <Serif size="6" color="black100">
            Artsy identity verification
          </Serif>

          <Box textAlign="left">
            <Sans size="4" color="black100" mt={2} weight="medium">
              You’ll need
            </Sans>
            <Sans size="4" color="black100">
              • A camera on your phone or computer
            </Sans>
            <Sans size="4" color="black100">
              • Your government ID{" "}
            </Sans>
            <Sans size="4" color="black100" mt={2} weight="medium">
              Keep in mind
            </Sans>
            <Sans size="4" color="black100">
              • Verification will take 5–10 minutes
            </Sans>
            <Sans size="4" color="black100">
              • The name on your ID must match the name on your payment method
            </Sans>
            <Sans size="4" color="black100">
              • Your ID and photo will only be used for verification purposes,
              and will not be shared
            </Sans>
            <br />
            <Sans size="4" color="black100">
              By clicking the button, you'll be redirected to our identity
              verification partner.
            </Sans>
          </Box>

          <Button
            loading={requesting}
            block
            width={["100%", 335]}
            mt={4}
            onClick={() => {
              setRequesting(true)
              trackClickedContinueToVerification()
              startIdentityVerification()
            }}
          >
            Continue to verification
          </Button>
        </Box>
      </Box>
    </>
  )
}
