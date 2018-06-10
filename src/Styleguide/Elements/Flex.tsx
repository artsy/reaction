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
  WidthProps,
  height,
  width,
  style,
} from "styled-system"

// @ts-ignore
import { ClassAttributes, HTMLAttributes } from "react"

const flexGrow = style({
  prop: "flexGrow",
  numberToPx: false,
})

interface FlexProps
  extends AlignItemsProps,
    FlexDirectionProps,
    JustifyContentProps,
    SpaceProps,
    HeightProps,
    WidthProps {
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
  ${width};
  ${flexGrow};
`
