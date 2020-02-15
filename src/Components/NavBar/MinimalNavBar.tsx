import { ArtsyLogoBlackIcon, Box } from "@artsy/palette"
import { RouterLink } from "Artsy/Router/RouterLink"
import React from "react"

interface MinimalNavBarProps {
  to: string
  children: React.ReactNode
}

export const MinimalNavBar: React.FC<MinimalNavBarProps> = props => {
  return (
    <Box>
      <Box height={70} px={[0, 4]} mt={4}>
        <RouterLink to={props.to}>
          <ArtsyLogoBlackIcon />
        </RouterLink>
      </Box>
      {props.children}
    </Box>
  )
}
