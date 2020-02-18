import { ArtsyLogoBlackIcon, Box } from "@artsy/palette"
import { AppContainer } from "Apps/Components/AppContainer"
import { RouterLink } from "Artsy/Router/RouterLink"
import React from "react"

interface MinimalNavBarProps {
  to: string
  children: React.ReactNode
}

export const MinimalNavBar: React.FC<MinimalNavBarProps> = props => {
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
          <RouterLink to={props.to}>
            <ArtsyLogoBlackIcon />
          </RouterLink>
        </Box>
      </AppContainer>

      {props.children}
    </Box>
  )
}
