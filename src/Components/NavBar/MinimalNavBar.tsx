import { ArtsyLogoBlackIcon, Box } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { RouterLink } from "Artsy/Router/RouterLink"
import React from "react"

interface MinimalNavBarProps {
  children: React.ReactNode
  logo?: React.ReactNode
  to: string
}

export const MinimalNavBar: React.FC<MinimalNavBarProps> = ({
  children,
  logo = <ArtsyLogoBlackIcon />,
  to,
}) => {
  return (
    <Box
      zIndex={1000}
      background="white"
      position="absolute"
      left={0}
      top={0}
      width="100%"
      pt={4}
    >
      <AppContainer>
        <Box height={70} px={[2, 4]}>
          <RouterLink
            to={to}
            // TODO: figure out a minimal example of the underlying cause of this error
            // and submit an issue to TS 😓
            // @ts-ignore
            data-test="logoLink"
          >
            {logo}
          </RouterLink>
        </Box>
      </AppContainer>

      {children}
    </Box>
  )
}
