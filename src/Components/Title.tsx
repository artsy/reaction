import React from "react"
import styled from "styled-components"
import { garamond } from "Assets/Fonts"
import { media } from "./Helpers"

type TitleSize = "xxsmall" | "small" | "medium" | "large" | "xlarge"

interface TitleProps extends React.HTMLProps<HTMLDivElement> {
  titleSize?: TitleSize
  color?: string
}

const titleSizes = {
  xxsmall: "s15",
  small: "s23",
  medium: "s30",
  large: "s37",
  xlarge: "s50",
}

const Title: React.SFC<TitleProps> = props => {
  const newProps: TitleProps = { ...props }
  delete newProps.titleSize

  return <div {...newProps}>{props.children}</div>
}

const StyledTitle = styled(Title)`
  color: ${props => props.color};
  margin: 20px 0;
  ${p => garamond(titleSizes[p.titleSize] as any)};
  ${media.sm`
    font-size: ${titleSizes.small};
  `};
`

StyledTitle.defaultProps = {
  titleSize: "medium",
  color: "inherit",
}

export default StyledTitle
