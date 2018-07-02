// @ts-ignore
import React from "react"
import styled, { css } from "styled-components"
import {
  bottom,
  BottomProps,
  color,
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
  themeGet,
  top,
  TopProps,
  width,
  WidthProps,
  zIndex,
  ZIndexProps,
} from "styled-system"
import { Flex, FlexProps } from "./Flex"

const hover = css`
  &:hover {
    border-color: ${themeGet("colors.black60")};
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
  border: 1px solid ${themeGet("colors.black10")};
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
    PositionProps,
    TopProps,
    BottomProps,
    LeftProps,
    RightProps,
    ZIndexProps {}
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
  ${color};
  ${textAlign};
  ${maxWidth};
  ${zIndex};
`
