import { Box, Flex, Serif } from "@artsy/palette"
import React from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"

import { SystemContextProps, useSystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "Artsy/Relay/SystemQueryRenderer"

import { AppSecondFactor } from "./Components/AppSecondFactor"
import { BackupSecondFactor } from "./Components/BackupSecondFactor"

import { TwoFactorAuthentication_me } from "__generated__/TwoFactorAuthentication_me.graphql"
import { TwoFactorAuthenticationQuery } from "__generated__/TwoFactorAuthenticationQuery.graphql"
import { SmsSecondFactor } from "./Components/SmsSecondFactor"

export interface TwoFactorAuthenticationProps extends SystemContextProps {
  me: TwoFactorAuthentication_me
  relay: RelayRefetchProp
}

const TwoFactorAuthentication: React.FC<TwoFactorAuthenticationProps> = props => {
  const { me, relay } = props

  return (
    <Box>
      <Flex flexDirection="row" alignItems="flex-end">
        <Serif size="6" color="black100">
          Two-factor Authentication
        </Serif>
        {me.hasSecondFactorEnabled && (
          <Serif ml={1} size="4" color="green100">
            Enabled
          </Serif>
        )}
      </Flex>
      <Serif mt={1} size="3t" maxWidth="515px" color="black60">
        Set up an additional layer of security by requiring a security code in
        addition to your password to log in to your Artsy account.
      </Serif>
      <AppSecondFactor mt={3} me={me} relay={relay} />
      <SmsSecondFactor mt={2} me={me} relay={relay} />
      {me.hasSecondFactorEnabled && <BackupSecondFactor mt={2} me={me} />}
    </Box>
  )
}

export const TwoFactorAuthenticationRefetchContainer = createRefetchContainer(
  TwoFactorAuthentication,
  {
    me: graphql`
      fragment TwoFactorAuthentication_me on Me {
        hasSecondFactorEnabled

        appSecondFactors: secondFactors(kinds: [app]) {
          internalID
          ... on AppSecondFactor {
            name
          }
        }

        smsSecondFactors: secondFactors(kinds: [sms]) {
          internalID
          ... on SmsSecondFactor {
            formattedPhoneNumber
          }
        }

        ...BackupSecondFactor_me @relay(mask: false)
      }
    `,
  },
  graphql`
    query TwoFactorAuthenticationRefetchQuery @raw_response_type {
      me {
        ...TwoFactorAuthentication_me
      }
    }
  `
)

export const TwoFactorAuthenticationQueryRenderer = () => {
  const { user, relayEnvironment } = useSystemContext()

  if (!user) {
    return null
  }

  return (
    <QueryRenderer<TwoFactorAuthenticationQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query TwoFactorAuthenticationQuery @raw_response_type {
          me {
            ...TwoFactorAuthentication_me
          }
        }
      `}
      render={renderWithLoadProgress(TwoFactorAuthenticationRefetchContainer)}
    />
  )
}
