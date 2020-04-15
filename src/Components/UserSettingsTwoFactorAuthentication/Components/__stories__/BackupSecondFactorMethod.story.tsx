import { Box, Theme } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import { UserSettingsTwoFactorAuthentication_me } from "__generated__/UserSettingsTwoFactorAuthentication_me.graphql"
import React from "react"
import { BackupSecondFactorMethod } from "../BackupSecondFactorMethod"

storiesOf("Settings/2FA/Components", module).add(
  "BackupSecondFactorMethod/Disabled",
  () => {
    const fixture = ({
      backupSecondFactors: [],
    } as unknown) as UserSettingsTwoFactorAuthentication_me

    return (
      <Theme>
        <Box maxWidth="800px">
          <BackupSecondFactorMethod me={fixture} />
        </Box>
      </Theme>
    )
  }
)

storiesOf("Settings/2FA/Components", module).add(
  "BackupSecondFactorMethod/Enabled",
  () => {
    const fixture = ({
      backupSecondFactors: [{}],
    } as unknown) as UserSettingsTwoFactorAuthentication_me
    return (
      <Theme>
        <Box maxWidth="800px">
          <BackupSecondFactorMethod me={fixture} />
        </Box>
      </Theme>
    )
  }
)
