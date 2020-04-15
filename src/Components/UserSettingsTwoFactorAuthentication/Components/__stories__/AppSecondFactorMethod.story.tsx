import { Box, Theme } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import { UserSettingsTwoFactorAuthentication_me } from "__generated__/UserSettingsTwoFactorAuthentication_me.graphql"
import React from "react"
import { AppSecondFactorMethod } from "../AppSecondFactorMethod"

storiesOf("Settings/2FA/Components", module).add(
  "AppSecondFactorMethod",
  () => {
    const fixture = ({
      appSecondFactors: [],
    } as unknown) as UserSettingsTwoFactorAuthentication_me

    return (
      <Theme>
        <Box maxWidth="800px">
          <AppSecondFactorMethod me={fixture} />
        </Box>
      </Theme>
    )
  }
)
