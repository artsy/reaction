import { Box, Button, Sans, Serif } from "@artsy/palette"
import { IdentityVerificationPage_me } from "__generated__/IdentityVerificationPage_me.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { SystemContextConsumer, useTracking } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"
import { ErrorPage } from "Components/ErrorPage"
import React from "react"
import { Meta, Title as HeadTitle } from "react-head"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"

interface Props {
  me: IdentityVerificationPage_me
}

export const IdentityVerification: React.FC<Props> = ({ me }) => {
  const { identityVerification } = me

  // TODO: account for: expired, not present, completed, etc
  if (!identityVerification || identityVerification.userID !== me.internalID) {
    return <ErrorPage code={404} />
  }

  const { trackEvent } = useTracking()

  const clickContinueToVerification = () => {
    trackEvent({
      action_type: Schema.ActionType.ClickedContinueToIdVerification,
      context_module: Schema.ContextModule.IdentityVerificationPage,
      user_id: me.internalID,
      identity_verification_id: identityVerification.internalID,
    })
  }

  return (
    <SystemContextConsumer>
      {() => {
        return (
          <AppContainer>
            <HeadTitle>Artsy | ID Verification</HeadTitle>

            <Meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
            />

            <Box px={[2, 3]} mb={6}>
              <Box
                mx={["auto"]}
                width={["100%", "80%"]}
                maxWidth={"520px"}
                textAlign="center"
              >
                <Serif size="6" color="black100">
                  Artsy identity verification
                </Serif>

                <Sans size="4" color="black100" mt={2}>
                  To complete this process, you'll need a government ID and
                  access to a camera on your phone or computer.
                </Sans>
                <Sans size="4" color="black100" mt={2}>
                  Your ID and photo will be used for verification purposes only,
                  and will not be shared.
                </Sans>
                <Sans size="4" color="black100" mt={2}>
                  Verification will take 5–10 minutues.
                </Sans>
                <Button
                  block
                  width={["100%", 335]}
                  mt={4}
                  onClick={() => {
                    clickContinueToVerification()
                  }}
                >
                  Continue to verification
                </Button>
              </Box>
            </Box>
          </AppContainer>
        )
      }}
    </SystemContextConsumer>
  )
}

const IdentityVerificationPage = createFragmentContainer(IdentityVerification, {
  me: graphql`
    fragment IdentityVerificationPage_me on Me
      @argumentDefinitions(id: { type: "String!" }) {
      internalID
      name
      identityVerification(id: $id) {
        internalID
        state
        userID
      }
    }
  `,
})
export default IdentityVerificationPage
