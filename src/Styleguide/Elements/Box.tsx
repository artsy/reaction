import { color } from "@artsy/palette"
// @ts-ignore
import React from "react"
import styled, { css } from "styled-components"
import {
  bottom,
  BottomProps,
  color as styledColor,
  ColorProps,
  display,
  DisplayProps,
  height,
  HeightProps,
  left,
  LeftProps,
  maxWidth,
  MaxWidthProps,
  position,
  PositionProps,
  right,
  RightProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
  top,
  TopProps,
  width,
  WidthProps,
} from "styled-system"
import { Flex, FlexProps } from "./Flex"

const hover = css`
  &:hover {
    border-color: ${color("black60")};
  }
`

export interface BorderBoxProps
  extends FlexProps,
    SpaceProps,
    MaxWidthProps,
    WidthProps,
    HeightProps {
  hover?: boolean
}

export const BorderBox = styled(Flex).attrs<BorderBoxProps>({})`
  border: 1px solid ${color("black10")};
  border-radius: 2px;
  ${props => props.hover && hover};
  ${space};
  ${maxWidth};
  ${width};
  ${height};
`
BorderBox.defaultProps = {
  p: 2,
}

export interface BoxProps
  extends DisplayProps,
    SpaceProps,
    WidthProps,
    MaxWidthProps,
    HeightProps,
    ColorProps,
    TextAlignProps,
    TopProps,
    RightProps,
    LeftProps,
    BottomProps,
    PositionProps {}
export const Box = styled.div.attrs<BoxProps>({})`
  ${space};
  ${display};
  ${width};
  ${height};
  ${position};
  ${top};
  ${right};
  ${bottom};
  ${left};
  ${styledColor};
  ${textAlign};
  ${maxWidth};
`
