import { Flex, FlexProps, color } from "@artsy/palette"
import React, { FC } from "react"
import styled from "styled-components"

const BorderedFlex = styled(Flex)`
  border-left: 1px solid ${color("black10")};
  flex-shrink: 0;
  margin-left: -1px;
`

export const Details: FC<FlexProps> = props => {
  return (
    <BorderedFlex flexShrink={0} {...props}>
      Details...
    </BorderedFlex>
  )
}
