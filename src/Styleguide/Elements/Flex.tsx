import styled from "styled-components"

import {
  alignContent,
  alignItems,
  AlignItemsProps,
  flexDirection,
  FlexDirectionProps,
  justifyContent,
  JustifyContentProps,
  space,
  SpaceProps,
} from "styled-system"

interface FlexProps
  extends AlignItemsProps,
    FlexDirectionProps,
    JustifyContentProps,
    SpaceProps {}

export const Flex = styled.div.attrs<FlexProps>({})`
  display: flex;
  ${alignContent};
  ${alignItems};
  ${flexDirection};
  ${justifyContent};
  ${space};
`
