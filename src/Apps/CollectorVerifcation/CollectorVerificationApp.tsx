import { Box } from "@artsy/palette"
import React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"

export const CollectorVerification = props => {
  const {
    me: { identityVerification },
  } = props
  return (
    <Box>
      Hello {props.me.name}. Your Identity Verification{" "}
      {identityVerification.id} is {identityVerification.state}
    </Box>
  )
}

export const CollectorVerificationApp = createFragmentContainer(
  CollectorVerification,
  {
    me: graphql`
      fragment CollectorVerificationApp_me on Me
        @argumentDefinitions(id: { type: "String!" }) {
        name
        identityVerification(id: $id) {
          id
          state
          invitationExpiresAt
        }
      }
    `,
  }
)
