// @ts-ignore
import React, { StatelessComponent } from "react"
import styled from "styled-components"
import "../Assets/Fonts"
import icons, { IconName } from "../Assets/Icons"
import { top, right, bottom, left, space, PositionProps } from "styled-system"

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

const Icon: React.SFC<IconProps> = props => (
  <div className={props.className} style={props.style} onClick={props.onClick}>
    {icons[props.name]}
  </div>
)

export default styled(Icon)`
  font-family: ${props => props.font || "artsy-icons"};
  color: ${props => props.color || "purple"};
  font-size: ${props => props.fontSize || "24px"};
  margin: 0 5px;
  display: inline-block;
  letter-spacing: 0px;
  position: relative;

  ${space};
  ${top};
  ${right};
  ${bottom};
  ${left};
`
