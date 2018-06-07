import styled from "styled-components"
import { FlexboxProperties, MarginProperties } from "../StyledSystemTypes"
import {
  flexDirection,
  alignItems,
  alignContent,
  justifyContent,
  space,
} from "styled-system"

export type FlexProps = FlexboxProperties & MarginProperties

export const Flex = styled.div.attrs<FlexProps>({})`
  display: flex;
  ${flexDirection};
  ${alignItems};
  ${alignContent};
  ${justifyContent};
  ${space};
`
