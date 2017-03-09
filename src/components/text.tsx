import * as React from "react"
import styled from "styled-components"
import * as fonts from "../assets/fonts"

type TextAlign = "start" | "center" | "end"
type TextSize = "small" | "large"

interface TextProps extends React.HTMLProps<HTMLParagraphElement> {
  textSize?: TextSize,
  align?: TextAlign,
  color?: string,
}

const textSizes = {
  small: "17px",
  large: "20px",
}

const Text: React.SFC<TextProps> = props => (
  <p className={props.className}>
    {props.children}
  </p>
)

export default styled(Text)`
  font-size: ${props => textSizes[props.textSize]};
  text-align: ${props => props.align};
  color: ${props => props.color};
  ${fonts.secondary.style};
`

Text.defaultProps = {
  textSize: "small",
  align: "start",
  color: "currentcolor",
}
