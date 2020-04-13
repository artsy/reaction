import {
  BorderBox,
  Box,
  Button,
  Flex,
  Link,
  Sans,
  Serif,
  Theme,
} from "@artsy/palette"
import { BorderBoxProps } from "@artsy/palette/dist/elements/BorderBox/BorderBoxBase"
import React from "react"
import { createFragmentContainer, graphql, RelayProp } from "react-relay"

import { SystemContextProps, useSystemContext } from "Artsy"
import { renderWithLoadProgress } from "Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "Artsy/Relay/SystemQueryRenderer"

import { UserSettingsTwoFactorAuthentication_me } from "__generated__/UserSettingsTwoFactorAuthentication_me.graphql"
import { UserSettingsTwoFactorAuthenticationQuery } from "__generated__/UserSettingsTwoFactorAuthenticationQuery.graphql"

export interface UserSettingsTwoFactorAuthenticationProps
  extends SystemContextProps {
  relay?: RelayProp
  me: UserSettingsTwoFactorAuthentication_me
}

interface SecondFactorMethodProps extends BorderBoxProps {
  me: UserSettingsTwoFactorAuthentication_me
}

const AppSecondFactorMethod: React.FC<SecondFactorMethodProps> = props => {
  const { me } = props
  return (
    <BorderBox p={20} {...props}>
      <Flex flexDirection="row" justifyContent="space-between" width="100%">
        <Flex flexDirection="column" width="345px">
          <Sans size="4t" color="black100">
            App Authenticator
          </Sans>
          <Serif size="3t" color="black60">
            Generate secure authentication codes using an application such as{" "}
            <Link href="https://support.1password.com/one-time-passwords">
              1Password
            </Link>{" "}
            or <Link href="https://authy.com/features">Authy</Link>.
          </Serif>
        </Flex>
        <Flex alignItems="center">
          {me.appSecondFactors.length ? (
            <>
              <Sans color="black60" size="3" weight="medium">
                {me.appSecondFactors[0].name}
              </Sans>
              <Button ml={10} variant="secondaryOutline">
                Disable
              </Button>
              <Button ml={10} variant="secondaryGray">
                Edit
              </Button>
            </>
          ) : (
            <Button>Set up</Button>
          )}
        </Flex>
      </Flex>
    </BorderBox>
  )
}

const SmsFactorMethod: React.FC<SecondFactorMethodProps> = props => {
  const { me } = props

  return (
    <BorderBox p={20} {...props}>
      <Flex flexDirection="row" justifyContent="space-between" width="100%">
        <Flex flexDirection="column" width="345px">
          <Sans size="4t" color="black100">
            Use text messages
          </Sans>
          <Serif size="3t" color="black60">
            Security codes will be sent to your mobile phone.
          </Serif>
        </Flex>
        <Flex alignItems="center">
          {me.smsSecondFactors.length ? (
            <>
              <Sans color="black60" size="3" weight="medium">
                {me.smsSecondFactors[0].maskedPhone}
              </Sans>
              <Button ml={10} variant="secondaryOutline">
                Disable
              </Button>
              <Button ml={10} variant="secondaryGray">
                Edit
              </Button>
            </>
          ) : (
            <Button>Set up</Button>
          )}
        </Flex>
      </Flex>
    </BorderBox>
  )
}

const BackupSecondFactorMethod: React.FC<SecondFactorMethodProps> = props => {
  const { me } = props

  return (
    <BorderBox p={20} {...props}>
      <Flex flexDirection="row" justifyContent="space-between" width="100%">
        <Flex flexDirection="column" width="345px">
          <Sans size="4t" color="black100">
            Backup codes
          </Sans>
          <Serif size="3t" color="black60">
            Generate one-time backup codes to access your account. Keep these
            safe.
          </Serif>
        </Flex>
        <Flex alignItems="center">
          {me.backupSecondFactors.length ? (
            <>
              <Sans color="black60" size="3" weight="medium">
                {me.backupSecondFactors.length} remaining
              </Sans>
              <Button ml={10} variant="secondaryOutline">
                Show
              </Button>
              <Button ml={10} variant="secondaryGray">
                Regenerate
              </Button>
            </>
          ) : (
            <Button>Set up</Button>
          )}
        </Flex>
      </Flex>
    </BorderBox>
  )
}

export class UserSettingsTwoFactorAuthentication extends React.Component<
  UserSettingsTwoFactorAuthenticationProps
> {
  render() {
    const { me } = this.props

    return (
      <Theme>
        <Box maxWidth="782px">
          <Flex flexDirection="row" alignItems="flex-end">
            <Serif size="6" color="black100">
              Two-factor Authentication
            </Serif>
            {me.hasSecondFactorEnabled && (
              <Serif ml={10} size="4" color="green100">
                Enabled
              </Serif>
            )}
          </Flex>
          <Serif mt={10} size="3t" maxWidth="515px" color="black60">
            Set up an additional layer of security by requiring a security code
            in addition to your password to log in to your Artsy account.
          </Serif>
          <AppSecondFactorMethod mt={30} me={me} />
          <SmsFactorMethod mt={20} me={me} />
          <BackupSecondFactorMethod mt={20} me={me} />
        </Box>
      </Theme>
    )
  }
}

export const UserSettingsTwoFactorAuthenticationFragmentContainer = createFragmentContainer(
  UserSettingsTwoFactorAuthentication,
  {
    me: graphql`
      fragment UserSettingsTwoFactorAuthentication_me on Me {
        hasSecondFactorEnabled

        appSecondFactors: secondFactors(kinds: [app]) {
          ... on AppSecondFactor {
            name
          }
        }

        smsSecondFactors: secondFactors(kinds: [sms]) {
          ... on SmsSecondFactor {
            maskedPhone
          }
        }

        backupSecondFactors: secondFactors(kinds: [backup]) {
          ... on BackupSecondFactor {
            internalID
          }
        }
      }
    `,
  }
)

export const UserSettingsTwoFactorAuthenticationQueryRenderer = () => {
  const { user, relayEnvironment } = useSystemContext()

  if (!user) {
    return null
  }

  return (
    <QueryRenderer<UserSettingsTwoFactorAuthenticationQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query UserSettingsTwoFactorAuthenticationQuery {
          me {
            ...UserSettingsTwoFactorAuthentication_me
          }
        }
      `}
      render={renderWithLoadProgress(
        UserSettingsTwoFactorAuthenticationFragmentContainer
      )}
    />
  )
}
