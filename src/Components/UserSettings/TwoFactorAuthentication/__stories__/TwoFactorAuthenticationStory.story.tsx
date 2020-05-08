import { Box, Theme } from "@artsy/palette"
import { storiesOf } from "@storybook/react"
import React from "react"

import { SystemContextProvider } from "Artsy"
import { TwoFactorAuthenticationQueryRenderer } from "../"

storiesOf("Components/UserSettings/TwoFactorAuthentication", module).add(
  "Live",
  () => {
    return (
      <SystemContextProvider>
        <Theme>
          <Box maxWidth="800px">
            <TwoFactorAuthenticationQueryRenderer />
          </Box>
        </Theme>
      </SystemContextProvider>
    )
  }
)
