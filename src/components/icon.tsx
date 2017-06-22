import * as React from "react"
import styled from "styled-components"
import "../assets/fonts"
import icons, { IconName } from "../assets/icons"

export type FontName = string

export interface IconProps extends React.HTMLProps<HTMLDivElement> {
  font?: FontName
  name: IconName
  color?: string
  fontSize?: string
  style?: any
}

const Icon: React.SFC<IconProps> = props =>
  <div className={props.className} style={props.style}>
    {icons[props.name]}
  </div>

export default styled(Icon)`
  font-family: ${props => props.font || "artsy-icons"};
  color: ${props => props.color || "purple"};
  font-size: ${props => props.fontSize || "24px"};
  margin: 0 5px;
  display: inline-block;
`
