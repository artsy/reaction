import styled from "styled-components"
import { FlexboxProps, MarginProps } from "../StyledSystemTypes"
import {
  flexDirection,
  alignItems,
  alignContent,
  justifyContent,
  space,
} from "styled-system"

export type FlexProps = FlexboxProps & MarginProps

export const Flex = styled.div.attrs<FlexProps>({})`
  display: flex;
  ${flexDirection};
  ${alignItems};
  ${alignContent};
  ${justifyContent};
  ${space};
`
