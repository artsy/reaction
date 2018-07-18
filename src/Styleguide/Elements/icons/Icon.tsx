// @ts-ignore
import React from "react"
import styled from "styled-components"
import { space, SpaceProps } from "styled-system"

interface IconProps extends SpaceProps {}
export const Icon = styled.svg.attrs<IconProps>({})`
  ${space};
`
