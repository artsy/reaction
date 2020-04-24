import { Box, Theme } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import { MockRelayRenderer } from "DevTools"
import React from "react"
import { graphql } from "react-relay"

import { BackupSecondFactorFragmentContainer } from ".."
import {
  AppEnabledWithBackupCodesQueryResponse,
  DisabledQueryResponse,
  MutationResponse,
} from "../../../__tests__/fixtures"

const query = graphql`
  query BackupSecondFactorStoryQuery {
    me {
      ...BackupSecondFactor_me
    }
  }
`

const MockRequestBackupSecondFactor = ({ mockData }) => {
  return (
    <MockRelayRenderer
      Component={BackupSecondFactorFragmentContainer}
      mockData={mockData}
      mockMutationResults={MutationResponse}
      query={query}
    />
  )
}

storiesOf(
  "UserSettings/TwoFactorAuthentication/Components/BackupSecondFactor",
  module
).add("Disabled", () => {
  return (
    <Theme>
      <Box maxWidth="800px">
        <MockRequestBackupSecondFactor mockData={DisabledQueryResponse} />
      </Box>
    </Theme>
  )
})

storiesOf(
  "UserSettings/TwoFactorAuthentication/Components/BackupSecondFactor",
  module
).add("Enabled", () => {
  return (
    <Theme>
      <Box maxWidth="800px">
        <MockRequestBackupSecondFactor
          mockData={AppEnabledWithBackupCodesQueryResponse}
        />
      </Box>
    </Theme>
  )
})
