// @ts-ignore
import React from "react"

import { color } from "@artsy/palette"
import styled from "styled-components"
import { space, SpaceProps, width, WidthProps } from "styled-system"

interface SeparatorProps extends SpaceProps, WidthProps {}

export const Separator = styled.div.attrs<SeparatorProps>({})`
  ${space};
  ${width};
  border-top: 1px solid ${color("black10")};
`

Separator.defaultProps = {
  width: "100%",
}
