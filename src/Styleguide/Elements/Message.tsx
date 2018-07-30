import { color } from "@artsy/palette"
import { Sans } from "@artsy/palette"
import React from "react"
import { Flex, FlexProps } from "Styleguide/Elements/Flex"

export const StyledFlex = Flex.extend`
  background-color: ${color("black5")};
  border-radius: 2px;
`

interface MessageProps extends FlexProps {
  children: React.ReactNode | null
}

export function Message({ children, ...others }: MessageProps) {
  return (
    <StyledFlex p={2} {...others}>
      <Sans size="3t" color="black60" weight="regular">
        {children}
      </Sans>
    </StyledFlex>
  )
}
