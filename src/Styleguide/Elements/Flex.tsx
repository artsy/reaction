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
  HeightProps,
  height,
  style,
} from "styled-system"

const flexGrow = style({
  prop: "flexGrow",
  numberToPx: false,
})

interface FlexProps
  extends AlignItemsProps,
    FlexDirectionProps,
    JustifyContentProps,
    SpaceProps,
    HeightProps {
  flexGrow?: number | string
}

export const Flex = styled.div.attrs<FlexProps>({})`
  display: flex;
  ${alignContent};
  ${alignItems};
  ${flexDirection};
  ${justifyContent};
  ${space};
  ${height};
  ${flexGrow};
`
