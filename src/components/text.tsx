import * as React from "react"
import styled from "styled-components"
import * as fonts from "../assets/fonts"

type TextAlign = "start" | "center" | "end"
type TextSize = "small" | "large"
type TextStyle = "primary" | "secondary"

interface TextProps extends React.HTMLProps<HTMLParagraphElement> {
  textSize?: TextSize,
  textStyle?: TextStyle,
  align?: TextAlign,
  color?: string,
}

const textSizes = {
  small: "17px",
  large: "20px",
}

const textStyleNameToCss = {
  primary: fonts.primary.style,
  secondary: fonts.secondary.style,
}

const RawText: React.SFC<TextProps> = props => (
  <p className={props.className}>
    {props.children}
  </p>
)

const Text = styled(RawText)`
  font-size: ${props => textSizes[props.textSize]};
  text-align: ${props => props.align};
  color: ${props => props.color};
  ${props => textStyleNameToCss[props.textStyle]};
`

Text.defaultProps = {
  textSize: "small",
  textStyle: "secondary",
  align: "start",
  color: "currentcolor",
}

export default Text
