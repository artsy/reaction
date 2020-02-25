import { Box, Button, Sans, Serif } from "@artsy/palette"
import { CollectorVerificationApp_me } from "__generated__/CollectorVerificationApp_me.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { SystemContextConsumer, useTracking } from "Artsy"
import * as Schema from "Artsy/Analytics/Schema"
import { ErrorPage } from "Components/ErrorPage"
import React from "react"
import { Meta, Title as HeadTitle } from "react-head"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"

interface Props {
  me: CollectorVerificationApp_me
}

export const CollectorVerification: React.FC<Props> = ({ me }) => {
  const { identityVerification } = me

  // TODO: account for: expired, not present, completed, etc
  if (!identityVerification || identityVerification.userID !== me.internalID) {
    return <ErrorPage code={404} />
  }

  const { trackEvent } = useTracking()

  const clickContinueToVerification = () => {
    trackEvent({
      action_type: Schema.ActionType.ClickedBeginVerification,
      user_id: me.internalID,
      identity_verification_id: identityVerification.id,
    })
    console.log("clicked continue to verification")
  }

  return (
    <SystemContextConsumer>
      {() => {
        return (
          <AppContainer>
            <HeadTitle>Artsy | Collector Verification</HeadTitle>

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
                  Artsy Collector Verification
                </Serif>
                <Sans size="4" color="black100" mt={3}>
                  <code>
                    Hello {me.name}. Your Identity Verification{" "}
                    {identityVerification.id} is {identityVerification.state}
                  </code>
                </Sans>
                <Sans size="4" color="black100" mt={2}>
                  For transactions involving [explainer], Artsy requires users
                  to verify their identity. This helps us[prevent fraud etc.]
                </Sans>
                <br />
                <Sans size="4" color="black100" mt={2}>
                  Once you become a Verified Collector, you’ll have access to
                  [artworks in high-value auctions and other VIP stuff.]
                </Sans>
                <Sans size="4" color="black100" mt={2}>
                  Verification will take 5–10 minutues.
                </Sans>
                <Button
                  block
                  width={["100%", 400]}
                  mt={4}
                  onClick={() => {
                    console.log("click")
                    clickContinueToVerification()
                  }}
                >
                  Continue to Verification
                </Button>
              </Box>
            </Box>
          </AppContainer>
        )
      }}
    </SystemContextConsumer>
  )
}

export const CollectorVerificationApp = createFragmentContainer(
  CollectorVerification,
  {
    me: graphql`
      fragment CollectorVerificationApp_me on Me
        @argumentDefinitions(id: { type: "String!" }) {
        internalID
        name
        identityVerification(id: $id) {
          id
          state
          invitationExpiresAt
          userID
        }
      }
    `,
  }
)

// const SafeAreaContainer = styled(Box)`
//   padding: env(safe-area-inset-top) env(safe-area-inset-right)
//     env(safe-area-inset-bottom) env(safe-area-inset-left);
//   margin-bottom: 75px;
// `
