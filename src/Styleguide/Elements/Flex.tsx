import styled from "styled-components"
import {
  alignContent,
  AlignContentProps,
  alignItems,
  AlignItemsProps,
  flexDirection,
  FlexDirectionProps,
  justifyContent,
  JustifyContentProps,
  maxHeight,
  MaxHeightProps,
  height,
  HeightProps,
  maxWidth,
  MaxWidthProps,
  width,
  WidthProps,
  space,
  SpaceProps,
  style,
} from "styled-system"

// @ts-ignore
import { ClassAttributes, HTMLAttributes } from "react"

const flexGrow = style({
  prop: "flexGrow",
  numberToPx: false,
})

export interface FlexProps
  extends AlignItemsProps,
    AlignContentProps,
    FlexDirectionProps,
    JustifyContentProps,
    SpaceProps,
    HeightProps,
    WidthProps,
    MaxHeightProps,
    MaxWidthProps {
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
  ${maxHeight};
  ${width};
  ${maxWidth};
  ${flexGrow};
`
