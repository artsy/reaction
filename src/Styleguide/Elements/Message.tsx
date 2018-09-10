import { color, SansSize } from "@artsy/palette"
import { Sans } from "@artsy/palette"
import React, { SFC } from "react"
import styled from "styled-components"
import { Flex, FlexProps } from "Styleguide/Elements/Flex"

export const StyledFlex = styled(Flex)`
  background-color: ${color("black5")};
  border-radius: 2px;
`

interface MessageProps extends FlexProps {
  children: React.ReactNode | null
  size?: SansSize
}

export const Message: SFC<MessageProps> = ({ children, size, ...others }) => {
  return (
    <StyledFlex p={2} {...others}>
      <Sans size={size} color="black60" weight="regular">
        {children}
      </Sans>
    </StyledFlex>
  )
}

Message.defaultProps = {
  size: "3t",
}
