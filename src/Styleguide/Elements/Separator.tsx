// @ts-ignore
import React from "react"

import { color } from "@artsy/palette"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"

interface SeparatorProps extends SpaceProps {}

export const Separator = styled.div.attrs<SeparatorProps>({})`
  ${space};
  border-top: 1px solid ${color("black10")};
  width: 100%;
`
