import { Box, Theme } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import React from "react"
import { graphql } from "react-relay"

import { DisabledQueryResponse } from "Components/UserSettings/TwoFactorAuthentication/__tests__/fixtures"
import { MockRelayRenderer } from "DevTools"
import { AppSecondFactorFragmentContainer } from ".."

const MockAppSecondFactor = ({ mockData }) => {
  return (
    <MockRelayRenderer
      Component={AppSecondFactorFragmentContainer}
      mockData={mockData}
      query={graphql`
        query AppSecondFactorStoryQuery {
          me {
            ...AppSecondFactor_me
          }
        }
      `}
    />
  )
}

storiesOf(
  "UserSettings/TwoFactorAuthentication/Components/AppSecondFactor",
  module
).add("Disabled", () => {
  return (
    <Theme>
      <Box maxWidth="800px">
        <MockAppSecondFactor mockData={DisabledQueryResponse} />
      </Box>
    </Theme>
  )
})
