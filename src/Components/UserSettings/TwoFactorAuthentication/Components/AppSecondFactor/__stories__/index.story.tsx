import { Box, Theme } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import { TwoFactorAuthentication_me } from "__generated__/TwoFactorAuthentication_me.graphql"
import React from "react"
import { AppSecondFactor } from "../"

storiesOf(
  "UserSettings/TwoFactorAuthentication/Components/AppSecondFactor",
  module
).add("Disabled", () => {
  const fixture = ({
    appSecondFactors: [],
  } as unknown) as TwoFactorAuthentication_me

  return (
    <Theme>
      <Box maxWidth="800px">
        <AppSecondFactor me={fixture} />
      </Box>
    </Theme>
  )
})
