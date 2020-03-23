import { IdentityVerificationApp_me } from "__generated__/IdentityVerificationApp_me.graphql"
import { AppContainer } from "Apps/Components/AppContainer"
import { ErrorPage } from "Components/ErrorPage"
import React from "react"
import { Meta, Title as HeadTitle } from "react-head"
import { createFragmentContainer, graphql, RelayProp } from "react-relay"
import { CompleteFailed } from "./CompleteFailed"
import { CompletePassed } from "./CompletePassed"
import { StartIdentityVerification } from "./StartIdentityVerification"

interface Props {
  me: IdentityVerificationApp_me
  relay: RelayProp
}

const IdentityVerificationApp: React.FC<Props> = props => {
  const { me, relay } = props
  const { identityVerification } = me

  if (!identityVerification || identityVerification.userID !== me.internalID) {
    return <ErrorPage code={404} />
  }

  let InnerComponent: React.FC = null

  if (identityVerification.state === "failed") {
    InnerComponent = () => <CompleteFailed />
  } else if (identityVerification.state === "passed") {
    InnerComponent = () => <CompletePassed />
  } else {
    InnerComponent = () => (
      <StartIdentityVerification
        relay={relay}
        identityVerification={identityVerification}
      />
    )
  }

  return (
    <AppContainer>
      <HeadTitle>Artsy | ID Verification</HeadTitle>
      <Meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5 viewport-fit=cover"
      />
      <InnerComponent />
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
          state
        }
      }
    `,
  }
)
export default IdentityVerificationAppFragmentContainer
