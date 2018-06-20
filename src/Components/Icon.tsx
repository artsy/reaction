// @ts-ignore
import React, { StatelessComponent } from "react"
import styled from "styled-components"
import {
  bottom,
  color,
  left,
  PositionProps,
  right,
  space,
  top,
} from "styled-system"
import "../Assets/Fonts"
import icons, { IconName } from "../Assets/Icons"

export type FontName = string

export interface IconProps
  extends React.HTMLProps<HTMLDivElement>,
    PositionProps {
  font?: FontName
  name: IconName
  color?: string
  fontSize?: string
  style?: any
  onClick?: () => void
}

const Icon: React.SFC<IconProps> = ({
  color,
  font,
  fontSize,
  name,
  ...props
}) => <div {...props}>{icons[name]}</div>

export default styled(Icon)`
  font-family: ${props => props.font || "artsy-icons"};
  color: ${props => props.color || "purple"};
  font-size: ${props => props.fontSize || "24px"};
  margin: 0 5px;
  display: inline-block;
  letter-spacing: 0px;
  position: relative;

  ${bottom};
  ${color};
  ${left};
  ${right};
  ${space};
  ${top};
`
