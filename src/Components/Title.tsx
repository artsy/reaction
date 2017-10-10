import * as React from "react"
import styled from "styled-components"
import * as fonts from "../assets/fonts"
import { media } from "./helpers"

type TitleSize = "small" | "medium" | "large" | "xlarge" | "xxlarge"

interface TitleProps extends React.HTMLProps<HTMLDivElement> {
  titleSize?: TitleSize
  color?: string
}

const titleSizes = {
  small: "25px",
  medium: "30px",
  large: "37px",
  xlarge: "50px",
  xxlarge: "72px",
}

const Title: React.SFC<TitleProps> = props => {
  const newProps: TitleProps = { ...props }
  delete newProps.titleSize

  return (
    <div {...newProps}>
      {props.children}
    </div>
  )
}

const StyledTitle = styled(Title)`
  font-size: ${props => titleSizes[props.titleSize]};
  color: ${props => props.color};
  margin: 20px 0;
  ${fonts.secondary.style}

  ${media.sm`
    font-size: ${titleSizes.small};
  `}
`

StyledTitle.defaultProps = {
  titleSize: "medium",
  color: "inherit",
}

export default StyledTitle
