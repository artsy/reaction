import { BorderBox, Button, Flex, Sans, Serif } from "@artsy/palette"
import { BorderBoxProps } from "@artsy/palette/dist/elements/BorderBox/BorderBoxBase"
import React from "react"

import { TwoFactorAuthentication_me } from "__generated__/TwoFactorAuthentication_me.graphql"

interface SmsSecondFactorProps extends BorderBoxProps {
  me: TwoFactorAuthentication_me
}

export const SmsSecondFactor: React.FC<SmsSecondFactorProps> = props => {
  const { me } = props

  return (
    <BorderBox p={2} {...props}>
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
                {me.smsSecondFactors[0].formattedPhoneNumber}
              </Sans>
              <Button ml={1} variant="secondaryOutline">
                Disable
              </Button>
              <Button ml={1} variant="secondaryGray">
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
