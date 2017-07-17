import * as React from "react"
import styled, { StyledFunction } from "styled-components"

interface FillwidthItemProps extends React.HTMLProps<HTMLDivElement> {
  width?: number
  height?: number
  margin?: number
  key: string
}

const div: StyledFunction<FillwidthItemProps & React.HTMLProps<HTMLDivElement>> = styled.div

export default div`
  margin-right: ${props => (props.margin ? props.margin + "px" : "0px")};
  width: ${props => (props.width ? props.width + "px" : "auto")};
  height: ${props => (props.height ? props.height + "px" : "auto")};
`
