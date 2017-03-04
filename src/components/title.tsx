import * as React from "react"
import styled from "styled-components"
import * as fonts from "../assets/fonts"

type TitleSize = "small" | "medium" | "large" | "xlarge" | "xxlarge"

interface TitleProps extends React.HTMLProps<JSX.Element> {
  titleSize?: TitleSize
}

const titleSizes = {
  small: "25px",
  medium: "30px",
  large: "37px",
  xlarge: "50px",
  xxlarge: "72px",
}

const Title: React.SFC<TitleProps> = props => (
  <div className={props.className}>
    {props.children}
  </div>
)

const StyledTitle = styled(Title)`
  font-size: ${props => titleSizes[props.titleSize]};
  margin: 20px 0;
  ${fonts.secondary.style}
`

StyledTitle.defaultProps = {
  titleSize: "medium",
}

export default StyledTitle
